import { Host, Inject, Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { INTERNAL_ICONS } from '../../../tokens/internal-icons.token';
import { InternalIconSetDefinition } from '../../icon/icon.interface';
import { type DataTableHeader, type DataTableItem, type SortSetting, EntireDataTableSettings } from '../data-table.interface';

@Injectable({ providedIn: 'root' })
export class DataService {
  public readonly items$ = new BehaviorSubject(this.settings.items);

  public readonly headers$ = new BehaviorSubject(this.settings.headers);

  public readonly sortBy$ = new BehaviorSubject(this.settings.sortBy);

  public readonly multiSort$ = new BehaviorSubject(this.settings.multiSort);

  public readonly search$ = new BehaviorSubject(this.settings.search);

  public readonly mobile$ = new BehaviorSubject(this.settings.mobile);

  public readonly showColumnsControl$ = new BehaviorSubject(this.settings.showColumnsControl);

  public constructor(
    @Inject(INTERNAL_ICONS) private readonly internalIcons: InternalIconSetDefinition,
    @Host() @Inject('anglifyDataTableSettings') public settings: EntireDataTableSettings
  ) {}

  public filteredHeaders$ = combineLatest([this.headers$, this.mobile$]).pipe(
    map(([headers, mobile]) =>
      headers.filter(header => {
        if (mobile) return !header.hiddenOnMobile;
        return !header.hidden;
      })
    )
  );

  public readonly filteredItems$ = combineLatest([
    this.items$,
    this.search$,
    this.headers$.pipe(map(headers => headers.filter(header => header.filterable !== false))),
  ]).pipe(
    map(([items, search, headers]) => {
      if (search) {
        return this.customFilterFn ? this.customFilterFn(search, headers, items) : DataService.filterFn(search, headers, items);
      }

      return items;
    })
  );

  public readonly sortedItems$ = combineLatest([this.sortBy$, this.filteredItems$, this.headers$]).pipe(
    map(([sortBy, items, headers]) => DataService.sortFn(sortBy, items, headers))
  );

  public customFilterFn: ((search: string, headers: DataTableHeader[], items: DataTableItem[]) => DataTableItem[]) | null | undefined =
    this.settings.customFilter;

  public static filterFn(search: string, headers: DataTableHeader[], items: DataTableItem[]) {
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

  public static sortFn(sortBy: SortSetting[], array: DataTableItem[], headers: DataTableHeader[]) {
    const items = array.slice();

    if (!sortBy.length) return items;

    return items.sort((a, b) => {
      for (const option of sortBy) {
        // if sort function is defined in headers, use it
        const header = headers.find(header => header.value === option.value);
        if (header?.sort) {
          const sort = header.sort(a, b, option.direction);
          if (sort !== 0) return sort;
          continue;
        }

        const aValue = a[option.value];
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
        return Boolean(sortBy.some(option => option.value === value));
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

  public toggleHeaderVisibility(header: DataTableHeader) {
    const headers = this.headers$.value;
    const index = headers.indexOf(header);
    if (index === -1) return;
    if (this.mobile$.value) {
      headers[index] = { ...headers[index], hiddenOnMobile: !headers[index].hiddenOnMobile };
    } else {
      headers[index] = { ...headers[index], hidden: !headers[index].hidden };
    }

    this.headers$.next(headers);
  }
}
