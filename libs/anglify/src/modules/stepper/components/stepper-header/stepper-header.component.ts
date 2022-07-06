import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  QueryList,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { RIPPLE } from '../../../../composables/ripple/ripple.provider';
import { RippleService } from '../../../../composables/ripple/ripple.service';
import { toBoolean } from '../../../../utils/functions';
import { BooleanLike } from '../../../../utils/interfaces';
import { SlotDirective } from '../../../common/directives/slot/slot.directive';
import { StepperSettings } from '../../services/stepper-settings/stepper-settings.service';
import { StepperService } from '../../services/stepper/stepper.service';

@UntilDestroy()
@Component({
  selector: 'anglify-stepper-header',
  templateUrl: './stepper-header.component.html',
  styleUrls: ['./stepper-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RIPPLE],
})
export class StepperHeaderComponent {
  @ContentChildren(SlotDirective) public readonly slots!: QueryList<SlotDirective>;

  @Input()
  public set label(value: string | null) {
    this.label$.next(value);
  }

  @Input() public visited = false;

  @Input()
  public set index(value: number) {
    this.index$.next(value);
  }

  @Input()
  public set isFirst(value: BooleanLike) {
    this.isFirst$.next(toBoolean(value));
  }

  @Input()
  public set isLast(value: BooleanLike) {
    this.isLast$.next(toBoolean(value));
  }

  @Input()
  public set active(value: BooleanLike) {
    this.active$.next(toBoolean(value));
    value ? this.elementRef.nativeElement.classList.add('active') : this.elementRef.nativeElement.classList.remove('active');
  }

  @Input()
  public set ripple(value: BooleanLike) {
    this.rippleService.active = toBoolean(value);
  }

  public readonly label$ = new BehaviorSubject<string | null>(null);
  public readonly index$ = new BehaviorSubject(0);
  public readonly active$ = new BehaviorSubject(false);
  private readonly isFirst$ = new BehaviorSubject(false);
  private readonly isLast$ = new BehaviorSubject(false);

  public readonly topStepConnectionLineVisible$ = combineLatest([this.isFirst$, this.stepperSettings.hasStepConnectionLine$]).pipe(
    map(([isFirstStep, hasStepConnectionLine]) => !isFirstStep && hasStepConnectionLine)
  );

  public readonly bottomStepConnectionLineVisible$ = combineLatest([this.isLast$, this.stepperSettings.hasStepConnectionLine$]).pipe(
    map(([isLastStep, hasStepConnectionLine]) => !isLastStep && hasStepConnectionLine)
  );

  private readonly headerNavigationEnabledHandler$ = this.stepperSettings.headerNavigationEnabled$.pipe(
    distinctUntilChanged(),
    tap(enabled => {
      enabled ? (this.elementRef.nativeElement.style.pointerEvents = 'auto') : (this.elementRef.nativeElement.style.pointerEvents = 'none');
    })
  );

  public constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    private readonly stepper: StepperService,
    private readonly stepperSettings: StepperSettings,
    private readonly rippleService: RippleService
  ) {
    this.headerNavigationEnabledHandler$.pipe(untilDestroyed(this)).subscribe();
    this.ripple = true;
  }

  // @ts-expect-error
  @HostBinding('tabindex') private readonly tabIndex = 0;

  @HostListener('click', ['$event'])
  @HostListener('keydown.enter', ['$event'])
  @HostListener('keydown.space', ['$event'])
  protected navigate(event: Event) {
    if (this.stepperSettings.getHeaderNavigationEnabledSnapshot()) {
      this.stepper.navigateTo(this.index$.value);
      event.stopPropagation();
    }
  }
}
