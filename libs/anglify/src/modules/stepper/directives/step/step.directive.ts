import { Directive, Input, Output, TemplateRef } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { toBoolean } from '../../../../utils/functions';
import { BooleanLike } from '../../../../utils/interfaces';
import { StepperService } from '../../services/stepper/stepper.service';

@UntilDestroy()
@Directive({
  selector: 'ng-template[anglifyStep]',
})
export class StepDirective {
  private readonly _isFirstStep$ = new BehaviorSubject<boolean>(false);
  public readonly isFirstStep$ = this._isFirstStep$.asObservable().pipe(shareReplay(1));

  private readonly _isLastStep$ = new BehaviorSubject<boolean>(false);
  public readonly isLastStep$ = this._isLastStep$.asObservable();

  private readonly _label$ = new BehaviorSubject<string>('');
  public readonly label$ = this._label$.asObservable().pipe(shareReplay(1));

  private readonly _visited$ = new BehaviorSubject(false);
  public readonly visited$ = this._visited$.asObservable().pipe(shareReplay(1));

  private readonly _valid$ = new BehaviorSubject(true);
  public readonly valid$ = this._valid$.asObservable().pipe(shareReplay(1));

  private readonly _index$ = new BehaviorSubject<number>(-1);
  public readonly index$ = this._index$.asObservable();

  public readonly selected$ = combineLatest([this.stepper.selectedIndex$, this._index$]).pipe(
    map(([selectedIndex, currentStepIndex]) => selectedIndex === currentStepIndex),
    tap(isSelected => {
      if (isSelected && !this.getVisitedSnapshot()) {
        this.setVisited(true);
      }
    }),
    shareReplay(1)
  );

  @Input()
  public set label(label: string) {
    this._label$.next(label);
  }

  @Input()
  public set valid(valid: BooleanLike) {
    this._valid$.next(toBoolean(valid));
  }

  @Output() public selectedChange = this.selected$;
  @Output() public validChange = this.valid$;
  @Output() public visitedChange = this.visited$;

  public constructor(protected readonly stepper: StepperService, public template: TemplateRef<any>) {
    this.selected$.pipe(untilDestroyed(this)).subscribe();
  }

  public setLabel(label: string) {
    this._label$.next(label);
  }

  public getLabelSnapshot() {
    return this._label$.value;
  }

  public setVisited(visited: boolean) {
    this._visited$.next(visited);
  }

  public getVisitedSnapshot() {
    return this._visited$.value;
  }

  public setIsFirstStep(value: boolean) {
    this._isFirstStep$.next(value);
  }

  public setISLastStep(value: boolean) {
    this._isLastStep$.next(value);
  }

  public setIndex(index: number) {
    this._index$.next(index);
  }

  public getIndexSnapshot() {
    return this._index$.value;
  }

  public setValid(valid: boolean) {
    this._valid$.next(valid);
  }

  public getValidSnapshot() {
    return this._valid$.value;
  }
}
