import { Host, Inject, Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';
import { DataService } from './data.service';
import { EntireDataTableSettings } from '../data-table.interface';

@UntilDestroy()
@Injectable()
export class PaginationService {
  public readonly page$ = new BehaviorSubject(this.settings.page);
  public readonly itemsPerPage$ = new BehaviorSubject({ text: '5', value: 5 });

  public itemsPerPageOptions = [
    { value: 5, text: '5' },
    { value: 10, text: '10' },
    { value: 15, text: '15' },
    { value: Infinity, text: 'All' },
  ];

  public constructor(
    @Host() @Inject('anglifyDataTableSettings') public settings: EntireDataTableSettings,
    @Host() private readonly dataService: DataService
  ) {
    this.itemsPerPage$
      .pipe(
        untilDestroyed(this),
        tap(() => {
          this.page$.next(1);
        })
      )
      .subscribe();
  }

  public readonly currentlyDisplayedItemsRange$ = combineLatest([this.page$, this.itemsPerPage$, this.dataService.filteredItems$]).pipe(
    map(([page, itemsPerPage, items]) => {
      const start = (page - 1) * (itemsPerPage.value === Infinity ? items.length : itemsPerPage.value);
      let end = page * (itemsPerPage.value === Infinity ? items.length : itemsPerPage.value);
      if (end > items.length) end = items.length;
      return { start, end };
    })
  );

  public readonly pagination$ = combineLatest([this.currentlyDisplayedItemsRange$, this.dataService.sortedItems$]).pipe(
    map(([range, items]) => `${range.start + 1}-${range.end} of ${items.length}`)
  );

  public readonly limitedItems$ = combineLatest([this.dataService.sortedItems$, this.currentlyDisplayedItemsRange$]).pipe(
    map(([items, range]) => items.slice(range.start, range.end))
  );

  public readonly maxPages$ = combineLatest([this.dataService.sortedItems$, this.itemsPerPage$]).pipe(
    map(([items, itemsPerPage]) => {
      if (itemsPerPage.value === Infinity) return 1;
      return Math.ceil(items.length / itemsPerPage.value);
    })
  );

  public readonly previousPageButtonDisabled$ = this.page$.pipe(map(page => page <= 1));
  public readonly nextPageButtonDisabled$ = combineLatest([this.page$, this.maxPages$]).pipe(map(([page, maxPages]) => page === maxPages));

  public previousPage() {
    this.page$.next(this.page$.value - 1);
  }

  public nextPage() {
    this.page$.next(this.page$.value + 1);
  }
}