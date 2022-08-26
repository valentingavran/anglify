import { Host, Inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, take } from 'rxjs';
import { DataService } from './data.service';
import { PaginationService } from './pagination.service';
import { DataTableComponent } from '../data-table.component';
import { DataTableItem, EntireDataTableSettings } from '../data-table.interface';

@Injectable()
export class SelectionService {
  public tableComponent!: DataTableComponent;

  public readonly selection$ = new BehaviorSubject<DataTableItem[]>([]);
  public readonly singleSelect$ = new BehaviorSubject(this.settings.singleSelect);
  public readonly selectableRows$ = new BehaviorSubject(this.settings.selectableRows);

  public constructor(
    @Host() @Inject('anglifyDataTableSettings') public settings: EntireDataTableSettings,
    @Host() private readonly paginationService: PaginationService,
    @Host() private readonly dataService: DataService
  ) {}

  public readonly headerCheckboxEnabled$ = combineLatest([this.selectableRows$, this.singleSelect$]).pipe(
    map(([selectableRows, singleSelect]) => selectableRows && !singleSelect)
  );

  public isSelected$(item: DataTableItem) {
    return this.selection$.pipe(map(selection => selection.includes(item)));
  }

  public readonly areAllSelected$ = combineLatest([
    this.paginationService.currentlyDisplayedItemsRange$,
    this.dataService.sortedItems$,
    this.selection$,
  ]).pipe(
    map(([{ start, end }, sortedItems, selection]) => {
      const allOfThisPage = sortedItems.slice(start, end);
      return allOfThisPage.every(item => selection.includes(item));
    })
  );

  public toggleSelection(item: DataTableItem) {
    if (this.selection$.value.includes(item)) {
      if (this.singleSelect$.value) {
        this.selection$.next([]);
      } else {
        this.selection$.next(this.selection$.value.filter(i => i !== item));
      }
    } else if (this.singleSelect$.value) {
      this.selection$.next([item]);
    } else {
      this.selection$.next([...this.selection$.value, item]);
    }
    this.tableComponent.selectionChange.next(this.selection$.value);
  }

  public toggleAll() {
    combineLatest([
      this.paginationService.currentlyDisplayedItemsRange$.pipe(take(1)),
      this.dataService.sortedItems$.pipe(take(1)),
      this.selection$.pipe(take(1)),
    ]).subscribe(([{ start, end }, items, selection]) => {
      const allOfThisPage = items.slice(start, end);
      if (allOfThisPage.every(item => selection.includes(item))) {
        this.selection$.next(selection.filter((item: DataTableItem) => !allOfThisPage.includes(item)));
      } else {
        this.selection$.next([...selection, ...allOfThisPage.filter(item => !selection.includes(item))]);
      }
      this.tableComponent.selectionChange.next(this.selection$.value);
    });
  }
}
