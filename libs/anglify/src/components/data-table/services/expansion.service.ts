import { Host, Inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { EntireDataTableSettings } from '../data-table.interface';

@Injectable()
export class ExpansionService {
  public expandable$ = new BehaviorSubject(this.settings.expandable);
  public readonly openedExpansions$ = new BehaviorSubject<number[]>([]);

  public constructor(@Host() @Inject('anglifyDataTableSettings') public settings: EntireDataTableSettings) {}

  public isExpanded$(index: number) {
    return combineLatest([this.expandable$, this.openedExpansions$]).pipe(
      map(([expandable, openedExpansions]) => expandable && openedExpansions.includes(index))
    );
  }

  public expand(index: number) {
    if (!this.expandable$.value) return;

    if (this.openedExpansions$.value.includes(index)) {
      this.openedExpansions$.next(this.openedExpansions$.value.filter(i => i !== index));
    } else {
      this.openedExpansions$.next([...this.openedExpansions$.value, index]);
    }
  }
}
