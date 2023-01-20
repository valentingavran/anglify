import { AsyncPipe, NgClass, NgForOf, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  QueryList,
  Self,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, map, skip } from 'rxjs';
import { SlotDirective } from '../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../directives/slot-outlet/slot-outlet.directive';
import { createSettingsProvider } from '../../factories/settings.factory';
import { FindSlotPipe } from '../../pipes/find-slot/find-slot.pipe';
import { INTERNAL_ICONS } from '../../tokens/internal-icons.token';
import { bindStyleValueToNativeElement } from '../../utils/functions';
import { ButtonComponent } from '../button/button.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { IconComponent } from '../icon/icon.component';
import { InternalIconSetDefinition } from '../icon/icon.interface';
import { ListComponent } from '../list/list/list.component';
import { ListItemComponent } from '../list/list-item/list-item.component';
import { ListItemTitleComponent } from '../list/list-item-title/list-item-title.component';
import { MenuComponent } from '../menu/menu.component';
import { ProgressLinearComponent } from '../progress-linear/progress-linear.component';
import { SelectComponent } from '../select/select.component';
import { DATA_TABLE_SETTINGS, DEFAULT_DATA_TABLE_SETTINGS } from './data-table-settings.token';
import type { DataTableHeader, DataTableItem, SortSetting } from './data-table.interface';
import { EntireDataTableSettings } from './data-table.interface';
import { IsColumnVisiblePipe } from './pipes/is-column-hidden.pipe';
import { DataService } from './services/data.service';
import { ExpansionService } from './services/expansion.service';
import { PaginationService } from './services/pagination.service';
import { SelectionService } from './services/selection.service';

@UntilDestroy()
@Component({
  selector: 'anglify-data-table',
  standalone: true,
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ExpansionService,
    PaginationService,
    SelectionService,
    DataService,
    createSettingsProvider<EntireDataTableSettings>('anglifyDataTableSettings', DEFAULT_DATA_TABLE_SETTINGS, DATA_TABLE_SETTINGS),
  ],
  imports: [
    NgIf,
    NgForOf,
    CheckboxComponent,
    SelectComponent,
    AsyncPipe,
    IconComponent,
    NgClass,
    FormsModule,
    FindSlotPipe,
    SlotOutletDirective,
    ButtonComponent,
    ProgressLinearComponent,
    ListItemComponent,
    ListComponent,
    ListItemTitleComponent,
    MenuComponent,
    SlotDirective,
    IsColumnVisiblePipe,
  ],
})
export class DataTableComponent implements EntireDataTableSettings {
  @ContentChildren(SlotDirective) protected readonly slots?: QueryList<SlotDirective>;

  public get headers() {
    return this.dataService.headers$.value;
  }

  @Input() public set headers(headers: DataTableHeader[]) {
    this.dataService.headers$.next(headers);
  }

  public get items() {
    return this.dataService.items$.value;
  }

  @Input() public set items(items: DataTableItem[]) {
    this.dataService.items$.next(items);
  }

  public get multiSort() {
    return this.dataService.multiSort$.value;
  }

  @Input() public set multiSort(value: boolean) {
    this.dataService.multiSort$.next(value);
  }

  public get search() {
    return this.dataService.search$.value;
  }

  @Input() public set search(value: string | undefined) {
    this.dataService.search$.next(value);
  }

  public get page() {
    return this.paginationService.page$.value;
  }

  @Input() public set page(value: number) {
    this.paginationService.page$.next(value);
  }

  @Input() public hideDefaultHeader = this.settings.hideDefaultHeader;

  @Input() public hideDefaultFooter = this.settings.hideDefaultFooter;

  public get expandable() {
    return this.expansionService.expandable$.value;
  }

  @Input() public set expandable(value: boolean) {
    this.expansionService.expandable$.next(value);
  }

  public get selectableRows() {
    return this.selectionService.selectableRows$.value;
  }

  @Input() public set selectableRows(value: boolean) {
    this.selectionService.selectableRows$.next(value);
  }

  public get selection() {
    return this.selectionService.selection$.value;
  }

  @Input() public set selection(value: DataTableItem[]) {
    this.selectionService.selection$.next(value);
  }

  public get itemKey() {
    return this.itemKey$.value;
  }

  @Input() public set itemKey(value: string) {
    this.itemKey$.next(value);
  }

  public get singleSelect() {
    return this.selectionService.singleSelect$.value;
  }

  @Input() public set singleSelect(value: boolean) {
    this.selectionService.singleSelect$.next(value);
  }

  public get showFirstLastPageControls() {
    return this.paginationService.showFirstLastPageControls$.value;
  }

  @Input() public set showFirstLastPageControls(value: boolean) {
    this.paginationService.showFirstLastPageControls$.next(value);
  }

  public get loading() {
    return this.loading$.value;
  }

  @Input() public set loading(value: boolean) {
    this.loading$.next(value);
  }

  @Input() public loadingText = this.settings.loadingText;

  @Input() public noDataText = this.settings.noDataText;

  public get mobile() {
    return this.dataService.mobile$.value;
  }

  @Input() public set mobile(value: boolean) {
    this.dataService.mobile$.next(value);
  }

  public get showColumnsControl() {
    return this.dataService.showColumnsControl$.value;
  }

  @Input() public set showColumnsControl(value: boolean) {
    this.dataService.showColumnsControl$.next(value);
  }

  public get customFilter() {
    return this.dataService.customFilterFn;
  }

  @Input() public set customFilter(
    value: ((search: string, headers: DataTableHeader[], items: DataTableItem<any>[]) => DataTableItem<any>[]) | null | undefined
  ) {
    this.dataService.customFilterFn = value;
  }

  public get sortBy() {
    return this.dataService.sortBy$.value;
  }

  @Input() public set sortBy(value: SortSetting[]) {
    this.dataService.sortBy$.next(value);
  }

  /**
   * Emitted when the selected items change.
   */
  @Output() public readonly selectionChange = new EventEmitter<DataTableItem[]>();

  // BehaviorSubjects emit their current value when subscribed to. Skip prevents that
  // eslint-disable-next-line rxjs/finnish
  @Output() public readonly sortByChange = this.dataService.sortBy$.pipe(skip(1));

  @Output() public readonly itemClick = new EventEmitter<DataTableItem>();

  protected readonly loading$ = new BehaviorSubject(this.settings.loading);

  private readonly itemKey$ = new BehaviorSubject(this.settings.itemKey);

  protected loadingTextVisible$ = combineLatest([this.loading$, this.paginationService.limitedItems$]).pipe(
    map(([loading, limitedItems]) => loading && limitedItems.length === 0)
  );

  protected noDataTextVisible$ = combineLatest([this.loading$, this.paginationService.limitedItems$]).pipe(
    map(([loading, limitedItems]) => !loading && limitedItems.length === 0)
  );

  private columnWidths$ = combineLatest([this.dataService.headers$, this.selectionService.selectableRows$, this.dataService.mobile$]).pipe(
    map(([headers, selectableRows, mobile]) => {
      if (mobile) return ['1fr'];
      let headerWidths = headers
        .filter(header => !header.hidden)
        .map(header => (header.width ? (typeof header.width === 'number' ? `${header.width}px` : header.width) : '1fr'));
      if (selectableRows) headerWidths = ['auto', ...headerWidths];
      return headerWidths;
    }),
    map(widths => widths.join(' '))
  );

  public constructor(
    @Inject(INTERNAL_ICONS) protected readonly internalIcons: InternalIconSetDefinition,
    @Self() @Inject('anglifyDataTableSettings') private readonly settings: EntireDataTableSettings,
    protected readonly elementRef: ElementRef<HTMLElement>,
    protected readonly selectionService: SelectionService,
    protected readonly expansionService: ExpansionService,
    protected readonly paginationService: PaginationService,
    protected readonly dataService: DataService
  ) {
    this.selectionService.tableComponent = this;

    bindStyleValueToNativeElement(this, this.columnWidths$, this.elementRef.nativeElement, '--anglify-data-table-column-widths');
  }

  protected readonly trackByFn = (index: number, item: DataTableItem) => item[this.itemKey$.value] || index;

  protected readonly headerTrackByFn = (index: number) => index;

  protected onRowClick(item: DataTableItem, index: number) {
    this.expansionService.expand(index);
    this.itemClick.emit(item);
  }
}
