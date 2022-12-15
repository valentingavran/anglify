import { AsyncPipe, NgIf } from '@angular/common';
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
import { SlotDirective } from '../../../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../../../directives/slot-outlet/slot-outlet.directive';
import { FindSlotPipe } from '../../../../pipes/find-slot/find-slot.pipe';
import { StepperService } from '../../services/stepper/stepper.service';
import { StepperSettings } from '../../services/stepper-settings/stepper-settings.service';

@UntilDestroy()
@Component({
  selector: 'anglify-stepper-header',
  standalone: true,
  templateUrl: './stepper-header.component.html',
  styleUrls: ['./stepper-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RIPPLE],
  imports: [NgIf, AsyncPipe, SlotOutletDirective, FindSlotPipe],
})
export class StepperHeaderComponent {
  @ContentChildren(SlotDirective) protected readonly slots!: QueryList<SlotDirective>;

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
  public set isFirst(value: boolean) {
    this.isFirst$.next(value);
  }

  @Input()
  public set isLast(value: boolean) {
    this.isLast$.next(value);
  }

  @Input()
  public set active(value: boolean) {
    this.active$.next(value);
    if (value) {
      this.elementRef.nativeElement.classList.add('active');
    } else {
      this.elementRef.nativeElement.classList.remove('active');
    }
  }

  @Input()
  public set ripple(value: boolean) {
    this.rippleService.active = value;
  }

  protected readonly label$ = new BehaviorSubject<string | null>(null);

  protected readonly index$ = new BehaviorSubject(0);

  protected readonly active$ = new BehaviorSubject(false);

  private readonly isFirst$ = new BehaviorSubject(false);

  private readonly isLast$ = new BehaviorSubject(false);

  protected readonly topStepConnectionLineVisible$ = combineLatest([this.isFirst$, this.stepperSettings.hasStepConnectionLine$]).pipe(
    map(([isFirstStep, hasStepConnectionLine]) => !isFirstStep && hasStepConnectionLine)
  );

  protected readonly bottomStepConnectionLineVisible$ = combineLatest([this.isLast$, this.stepperSettings.hasStepConnectionLine$]).pipe(
    map(([isLastStep, hasStepConnectionLine]) => !isLastStep && hasStepConnectionLine)
  );

  private readonly headerNavigationEnabledHandler$ = this.stepperSettings.headerNavigationEnabled$.pipe(
    distinctUntilChanged(),
    tap(enabled => {
      if (enabled) {
        this.elementRef.nativeElement.style.pointerEvents = 'auto';
      } else {
        this.elementRef.nativeElement.style.pointerEvents = 'none';
      }
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

  // @ts-expect-error: Value is used
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
