import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { delay, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { AnglifyDestroyService } from '../../../../services/destroy/destroy.service';
import type { Step } from '../../directives/step/step.directive';

@Injectable()
export abstract class Stepper {
  private readonly _steps$ = new BehaviorSubject<Step[]>([]);
  public readonly steps$ = this._steps$.asObservable();

  private readonly _selectedIndex$ = new BehaviorSubject<number>(0);
  public readonly selectedIndex$ = this._selectedIndex$.asObservable();
  public readonly selectedStep$ = this._selectedIndex$.pipe(
    switchMap(index =>
      this._steps$.pipe(
        take(1),
        map(steps => steps[index])
      )
    )
  );

  private readonly _previousAction = new Subject<void>();
  private readonly _nextAction = new Subject<void>();
  private readonly _navigateToAction = new Subject<number>();
  private readonly _updateStepsAction = new Subject<Step[]>();

  private readonly _resetAction$ = new Subject<void>();
  public readonly onReset$ = this._resetAction$.asObservable();

  private readonly _onPrevious$ = new Subject<void>();
  public readonly onPrevious$ = this._onPrevious$.asObservable();

  private readonly _onNext$ = new Subject<void>();
  public readonly onNext$ = this._onNext$.asObservable();

  private readonly _previousHandler$ = this._previousAction.pipe(
    tap(() => {
      const selectedIndex = this._selectedIndex$.value;
      if (selectedIndex === 0) return;
      this._selectedIndex$.next(selectedIndex - 1);
      this._onPrevious$.next();
    })
  );

  private readonly _nextHandler$ = this._nextAction.pipe(
    // Needed so that eventual active Step.valid$ changes are still taken into account
    delay(0),
    switchMap(() =>
      this._steps$.pipe(
        take(1),
        switchMap(currentSteps => {
          const currentlySelectedIndex = this._selectedIndex$.value;
          const activeStep = currentSteps[currentlySelectedIndex];
          return activeStep.valid$.pipe(
            take(1),
            tap(valid => {
              if (!valid) return;

              const nextStep = currentSteps[currentlySelectedIndex + 1] as Step | undefined;
              if (!nextStep) return;

              this._selectedIndex$.next(currentlySelectedIndex + 1);
              this._onNext$.next();
            })
          );
        })
      )
    )
  );

  private readonly _navigateToHandler$ = this._navigateToAction.pipe(
    switchMap(targetIndex =>
      this._steps$.pipe(
        take(1),
        tap(steps => {
          const currentlyActiveStepIndex = this._selectedIndex$.value;
          const currentlyActiveStep = steps[currentlyActiveStepIndex];

          for (let i = 0; i < steps.length; i++) {
            const s = steps[i];

            if (i !== targetIndex) {
              if (s.getValidSnapshot() && s.getVisitedSnapshot()) {
              } else {
                break;
              }
            } else if (s === currentlyActiveStep) {
              break;
            } else {
              this._selectedIndex$.next(targetIndex);
              if (targetIndex > currentlyActiveStepIndex) {
                this._onNext$.next();
              }
              if (targetIndex === currentlyActiveStepIndex - 1) {
                this._onPrevious$.next();
              }
              break;
            }
          }
        })
      )
    )
  );

  private readonly _updateStepsHandler$ = this._updateStepsAction.pipe(
    switchMap(steps =>
      this._steps$.pipe(
        take(1),
        tap(currentSteps => {
          Stepper.updateIndexesOfSteps(steps);
          Stepper.updateFirstAndLastSteps(steps);

          if (steps.length === 0) {
            this._selectedIndex$.next(0);
          } else if (currentSteps.length === 0) {
            // On init, set the first step as acti ve
            this._selectedIndex$.next(0);
          }
          this._steps$.next(steps);
        })
      )
    )
  );

  private readonly _resetHandler$ = this._resetAction$.pipe(
    switchMap(() =>
      this._steps$.pipe(
        take(1),
        tap(steps => {
          this._selectedIndex$.next(0);
          steps.forEach((step, i) => {
            if (i > 0) step.setVisited(false);
          });
        })
      )
    )
  );

  protected constructor(protected readonly destroy$: AnglifyDestroyService) {
    this._previousHandler$.pipe(takeUntil(this.destroy$)).subscribe();
    this._nextHandler$.pipe(takeUntil(this.destroy$)).subscribe();
    this._navigateToHandler$.pipe(takeUntil(this.destroy$)).subscribe();
    this._updateStepsHandler$.pipe(takeUntil(this.destroy$)).subscribe();
    this._resetHandler$.pipe(takeUntil(this.destroy$)).subscribe();
  }

  public previous() {
    this._previousAction.next();
  }

  public next() {
    this._nextAction.next();
  }

  public navigateTo(index: number) {
    this._navigateToAction.next(index);
  }

  public updateSteps(steps: Step[]) {
    this._updateStepsAction.next(steps);
  }

  public reset() {
    this._resetAction$.next();
  }

  private static updateIndexesOfSteps(steps: Step[]) {
    steps.forEach((s, i) => {
      s.setIndex(i);
    });
  }

  private static updateFirstAndLastSteps(steps: Step[]) {
    steps.forEach((s, i) => {
      s.setIsFirstStep(i === 0);
      s.setISLastStep(i === steps.length - 1);
    });
  }
}
