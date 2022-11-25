import { Host, Inject, Injectable } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, map, take, tap, withLatestFrom } from 'rxjs';
import { EntireDataTableSettings } from '../data-table.interface';
import { DataService } from './data.service';

@UntilDestroy()
@Injectable({ providedIn: 'root' })
export class PaginationService {
  public readonly page$ = new BehaviorSubject(this.settings.page);

  public readonly itemsPerPage$ = new BehaviorSubject<string[]>(['5']);

  public readonly showFirstLastPageControls$ = new BehaviorSubject(this.settings.showFirstLastPageControls);

  public itemsPerPageOptions = ['5', '10', '15', 'All'];

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

  public readonly currentlyDisplayedItemsRange$ = combineLatest([
    this.page$,
    this.itemsPerPage$.pipe(map(selection => selection[0])),
    this.dataService.filteredItems$,
  ]).pipe(
    map(([page, itemsPerPage, items]) => {
      const start = (page - 1) * (itemsPerPage === 'All' ? items.length : Number(itemsPerPage));
      let end = page * (itemsPerPage === 'All' ? items.length : Number(itemsPerPage));
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

  public readonly maxPages$ = combineLatest([this.dataService.sortedItems$, this.itemsPerPage$.pipe(map(selection => selection[0]))]).pipe(
    map(([items, itemsPerPage]) => {
      if (itemsPerPage === 'All') return 1;
      return Math.ceil(items.length / Number(itemsPerPage));
    })
  );

  public readonly firstPageDisabled$ = this.page$.pipe(map(page => page === 1));

  public readonly previousPageButtonDisabled$ = this.page$.pipe(map(page => page <= 1));

  public readonly nextPageButtonDisabled$ = combineLatest([this.page$, this.maxPages$]).pipe(
    map(([page, maxPages]) => page === maxPages || maxPages === 0)
  );

  public readonly lastPageDisabled$ = this.page$.pipe(
    withLatestFrom(this.maxPages$),
    map(([page, maxPages]) => page === maxPages)
  );

  public previousPage() {
    this.page$.next(this.page$.value - 1);
  }

  public nextPage() {
    this.page$.next(this.page$.value + 1);
  }

  public firstPage() {
    this.page$.next(1);
  }

  public lastPage() {
    this.maxPages$.pipe(take(1)).subscribe(maxPages => this.page$.next(maxPages));
  }
}
