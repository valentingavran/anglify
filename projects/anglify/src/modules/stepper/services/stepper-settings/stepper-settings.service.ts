import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type StepperOrientation = 'horizontal' | 'vertical';

@Injectable()
export class StepperSettings {
  private readonly _hasStepConnectionLine$ = new BehaviorSubject(true);
  public readonly hasStepConnectionLine$ = this._hasStepConnectionLine$.asObservable();

  private readonly _headerNavigationEnabled$ = new BehaviorSubject(true);
  public readonly headerNavigationEnabled$ = this._headerNavigationEnabled$.asObservable();

  private readonly _orientation$ = new BehaviorSubject<StepperOrientation>('vertical');
  public readonly orientation$ = this._orientation$.asObservable();

  public setHasStepConnectionLine(hasStepConnectionLine: boolean): void {
    this._hasStepConnectionLine$.next(hasStepConnectionLine);
  }

  public setHeaderNavigationEnabled(headerNavigationEnabled: boolean): void {
    this._headerNavigationEnabled$.next(headerNavigationEnabled);
  }

  public getHeaderNavigationEnabledSnapshot(): boolean {
    return this._headerNavigationEnabled$.value;
  }

  public setOrientation(orientation: StepperOrientation): void {
    this._orientation$.next(orientation);
  }
}
