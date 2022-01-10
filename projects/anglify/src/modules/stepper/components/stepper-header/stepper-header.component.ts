import { ChangeDetectionStrategy, Component, ContentChild, ElementRef, HostListener, Input } from '@angular/core';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { StepperSettings } from '../../services/stepper-settings/stepper-settings.service';
import { Stepper } from '../../services/stepper/stepper.service';
import { StepperVisitedIconDirective } from '../../directives/stepper-visited-icon/stepper-visited-icon.directive';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'anglify-stepper-header',
  templateUrl: './stepper-header.component.html',
  styleUrls: ['./stepper-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperHeaderComponent {
  @ContentChild(StepperVisitedIconDirective) public readonly stepperVisitedIcon!: StepperVisitedIconDirective;

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
    value ? this.elementRef.nativeElement.classList.add('active') : this.elementRef.nativeElement.classList.remove('active');
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
    private readonly elementRef: ElementRef,
    private readonly stepper: Stepper,
    private readonly stepperSettings: StepperSettings
  ) {
    this.headerNavigationEnabledHandler$.pipe(untilDestroyed(this)).subscribe();
  }

  @HostListener('click')
  private navigate(): void {
    if (this.stepperSettings.getHeaderNavigationEnabledSnapshot()) {
      this.stepper.navigateTo(this.index$.value);
    }
  }
}
