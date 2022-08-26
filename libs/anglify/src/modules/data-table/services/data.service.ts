import { Host, Inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { INTERNAL_ICONS } from '../../../tokens/internal-icons.token';
import { InternalIconSetDefinition } from '../../icon/icon.interface';
import { DataTableHeader, DataTableItem, EntireDataTableSettings, SortSetting } from '../data-table.interface';

@Injectable()
export class DataService {
  public readonly items$ = new BehaviorSubject<DataTableItem[]>([]);
  public readonly headers$ = new BehaviorSubject<DataTableHeader[]>([]);
  public readonly sortBy$ = new BehaviorSubject<SortSetting[]>([]);
  public readonly multiSort$ = new BehaviorSubject(this.settings.multiSort);
  public readonly search$ = new BehaviorSubject<string | undefined>(undefined);

  public constructor(
    @Inject(INTERNAL_ICONS) private readonly internalIcons: InternalIconSetDefinition,
    @Host() @Inject('anglifyDataTableSettings') public settings: EntireDataTableSettings
  ) {}

  public readonly filteredItems$ = combineLatest([
    this.items$,
    this.search$,
    this.headers$.pipe(map(headers => headers.filter(header => header.filterable !== false))),
  ]).pipe(
    map(([items, search, headers]) => {
      if (search) {
        return DataService.searchFn(search, headers, items);
      }
      return items;
    })
  );

  public readonly sortedItems$ = combineLatest([this.sortBy$, this.filteredItems$]).pipe(
    map(([sortBy, items]) => DataService.sortFn(sortBy, items))
  );

  public static searchFn(search: string, headers: DataTableHeader[], items: DataTableItem[]) {
    return items.filter(item => {
      for (const header of headers) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        if (item[header.value]?.toString().toLowerCase().includes(search.toLowerCase())) {
          return true;
        }
      }
      return false;
    });
  }

  public static sortFn(sortBy: SortSetting[], array: DataTableItem[]) {
    const items = array.slice();

    if (!sortBy.length) {
      return items;
    }

    return items.sort((a, b) => {
      for (const option of sortBy) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const aValue = a[option.value];
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const bValue = b[option.value];

        if (aValue === bValue) {
          continue;
        } else if (option.direction === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      }
      return 0;
    });
  }

  public isSortable$(value: string) {
    return combineLatest([
      this.headers$.pipe(map(headers => headers.find(header => header.value === value)?.sortable)),
      this.multiSort$,
      this.sortBy$,
    ]).pipe(
      map(([headerSortable, multiSort, sortBy]) => {
        if (headerSortable === false) return false;
        if (multiSort) return true;
        if (sortBy.length === 0) return true;
        if (sortBy.find(option => option.value === value)) return true;
        return false;
      })
    );
  }

  public getSortPriority$(value: string) {
    return this.sortBy$.pipe(
      map(sortBy => {
        const option = sortBy.find(option => option.value === value);
        return option ? sortBy.indexOf(option) + 1 : -1;
      })
    );
  }

  public toggleSort(value: string, sortable?: boolean) {
    if (sortable === false) return;
    const options = this.sortBy$.value;
    const option = options.find(option => option.value === value);
    if (option) {
      if (option.direction === 'asc') {
        option.direction = 'desc';
      } else {
        options.splice(options.indexOf(option), 1);
      }
    } else {
      options.push({
        value,
        direction: 'asc',
      });
    }
    this.sortBy$.next(options);
  }

  public getSortIcon$(value: string) {
    return this.sortBy$.pipe(
      map(sortBy => {
        const option = sortBy.find(option => option.value === value);
        return option ? (option.direction === 'asc' ? this.internalIcons.arrowDown : this.internalIcons.arrowUp) : undefined;
      })
    );
  }
}
