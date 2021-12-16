/* eslint-disable @angular-eslint/no-output-on-prefix */
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  ElementRef,
  Input,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';
import { Stepper } from '../../services/stepper/stepper.service';
import { StepperSettings, StepperOrientation } from '../../services/stepper-settings/stepper-settings.service';
import { Subject } from 'rxjs';
import { map, startWith, takeUntil, tap } from 'rxjs/operators';
import { Step } from '../../directives/step/step.directive';
import { animate, group, query, state, style, transition, trigger } from '@angular/animations';
import { StepperVisitedIconDirective } from '../../directives/stepper-visited-icon/stepper-visited-icon.directive';

@Component({
  selector: 'anglify-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: Stepper, useExisting: StepperComponent }, StepperSettings],
  animations: [
    trigger('fast-in-fast-out-y', [
      state('*', style({ 'overflow-y': 'hidden' })),
      state('void', style({ 'overflow-y': 'hidden' })),
      transition('* => void', [style({ height: '*' }), animate('300ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ height: 0 }))]),
      transition('void => *', [style({ height: '0' }), animate('300ms 320ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ height: '*' }))]),
    ]),
    trigger('slide', [
      transition(':increment', [
        group([
          query(':enter', [style({ transform: 'translateX(100%)' }), animate(300, style({ transform: 'translateX(0%)' }))], {
            optional: true,
          }),
          query(':leave', [style({ transform: 'translateX(0%)' }), animate(300, style({ transform: 'translateX(-100%)' }))], {
            optional: true,
          }),
        ]),
      ]),
      transition(':decrement', [
        group([
          query(':enter', [style({ transform: 'translateX(-100%)' }), animate(300, style({ transform: 'translateX(0%)' }))], {
            optional: true,
          }),
          query(':leave', [style({ transform: 'translateX(0%)' }), animate(300, style({ transform: 'translateX(100%)' }))], {
            optional: true,
          }),
        ]),
      ]),
    ]),
  ],
})
export class StepperComponent extends Stepper implements AfterContentInit, OnDestroy {
  @ContentChildren(Step) private readonly _steps?: QueryList<Step>;
  @ContentChild(StepperVisitedIconDirective) public readonly stepperVisitedIcon?: StepperVisitedIconDirective;

  @Input()
  public set stepConnectionLine(value: boolean) {
    this.stepperSettings.setHasStepConnectionLine(value);
  }

  @Input()
  public set headerNavigation(value: boolean) {
    this.stepperSettings.setHeaderNavigationEnabled(value);
  }

  @Input()
  public set orientation(value: StepperOrientation) {
    this.stepperSettings.setOrientation(value);
  }

  @Output() public readonly onPrevious = this.onPrevious$;
  @Output() public readonly onNext = this.onNext$;
  @Output() public readonly orientationChange = this.stepperSettings.orientation$;
  @Output() public readonly onReset = this.onReset$;
  @Output() public readonly stepChange = this.selectedStep$;

  private readonly destroyAction$ = new Subject<void>();

  private readonly _orientationHandler$ = this.stepperSettings.orientation$.pipe(
    tap(orientation => {
      if (orientation === 'horizontal') {
        this.elementRef.nativeElement.classList.add(orientation);
        this.elementRef.nativeElement.classList.remove('vertical');
      } else {
        this.elementRef.nativeElement.classList.add(orientation);
        this.elementRef.nativeElement.classList.remove('horizontal');
      }
    })
  );

  public constructor(public readonly stepperSettings: StepperSettings, private readonly elementRef: ElementRef) {
    super();
    this._orientationHandler$.pipe(takeUntil(this.destroyAction$)).subscribe();
  }

  public ngAfterContentInit(): void {
    this._steps!.changes.pipe(
      startWith(this._steps),
      takeUntil(this.destroyAction$),
      map(steps => steps.toArray() as Step[]),
      tap(steps => {
        this.updateSteps(steps);
      })
    ).subscribe();
  }

  public ngOnDestroy(): void {
    this.destroyAction$.next();
    this.destroyAction$.complete();
  }
}
