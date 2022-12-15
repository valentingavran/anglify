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
import { ListComponent } from '../list/components/list/list.component';
import { ListItemComponent } from '../list/components/list-item/list-item.component';
import { ListItemTitleComponent } from '../list/components/list-item-title/list-item-title.component';
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
export class DataTableComponent {
  @ContentChildren(SlotDirective) protected readonly slots?: QueryList<SlotDirective>;

  public get headers() {
    return this.dataService.headers$.value;
  }

  /**
   * An array of objects that each describe a header column.
   */
  @Input() public set headers(headers: DataTableHeader[]) {
    this.dataService.headers$.next(headers);
  }

  public get items() {
    return this.dataService.items$.value;
  }

  /**
   * The array of items to display.
   */
  @Input() public set items(items: DataTableItem[]) {
    this.dataService.items$.next(items);
  }

  public get multiSort() {
    return this.dataService.multiSort$.value;
  }

  /**
   * If true then one can sort on multiple properties.
   */
  @Input() public set multiSort(value: boolean) {
    this.dataService.multiSort$.next(value);
  }

  public get search() {
    return this.dataService.search$.value;
  }

  /**
   * Text input used to filter items.
   */
  @Input() public set search(value: string | undefined) {
    this.dataService.search$.next(value);
  }

  public get page() {
    return this.paginationService.page$.value;
  }

  /**
   * The current displayed page number (1-indexed).
   */
  @Input() public set page(value: number) {
    this.paginationService.page$.next(value);
  }

  public get hideDefaultHeader() {
    return this.hideDefaultHeader$.value;
  }

  /**
   * Hide the default headers.
   */
  @Input() public set hideDefaultHeader(value: boolean) {
    this.hideDefaultHeader$.next(value);
  }

  public get hideDefaultFooter() {
    return this.hideDefaultFooter$.value;
  }

  /**
   * Hides default footer.
   */
  @Input() public set hideDefaultFooter(value: boolean) {
    this.hideDefaultFooter$.next(value);
  }

  public get expandable() {
    return this.expansionService.expandable$.value;
  }

  /**
   * Turns on expandable rows.
   */
  @Input() public set expandable(value: boolean) {
    this.expansionService.expandable$.next(value);
  }

  public get selectableRows() {
    return this.selectionService.selectableRows$.value;
  }

  /**
   * Shows select checkboxes in both the header and rows.
   */
  @Input() public set selectableRows(value: boolean) {
    this.selectionService.selectableRows$.next(value);
  }

  public get selection() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.selectionService.selection$.value;
  }

  /**
   * Used for controlling selected rows.
   */
  @Input() public set selection(value: DataTableItem[]) {
    this.selectionService.selection$.next(value);
  }

  public get itemKey() {
    return this.itemKey$.value;
  }

  /**
   * The property on each item that is used as a unique key. `id` is used by default if available.
   */
  @Input() public set itemKey(value: string) {
    this.itemKey$.next(value);
  }

  public get singleSelect() {
    return this.selectionService.singleSelect$.value;
  }

  /**
   * Changes selection mode to single select.
   */
  @Input() public set singleSelect(value: boolean) {
    this.selectionService.singleSelect$.next(value);
  }

  public get showFirstLastPageControls() {
    return this.paginationService.showFirstLastPageControls$.value;
  }

  /**
   * Displays buttons that allow jumping to the first and last page.
   */
  @Input() public set showFirstLastPageControls(value: boolean) {
    this.paginationService.showFirstLastPageControls$.next(value);
  }

  public get loading() {
    return this.loading$.value;
  }

  /**
   * Displays a Linear Progress if this property is set to `true`. If there are no entries, then a loading text is also displayed.
   */
  @Input() public set loading(value: boolean) {
    this.loading$.next(value);
  }

  public get loadingText() {
    return this.loadingText$.value;
  }

  /**
   * Text shown when loading is `true` and no items are provided.
   */
  @Input() public set loadingText(value: string) {
    this.loadingText$.next(value);
  }

  public get noDataText() {
    return this.noDataText$.value;
  }

  /**
   * Text shown when no items are provided to the component and when loading is `false`.
   */
  @Input() public set noDataText(value: string) {
    this.noDataText$.next(value);
  }

  public get mobile() {
    return this.dataService.mobile$.value;
  }

  /**
   * Used to toggle between regular Data Table view and mobile view.
   */
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

  /**
   * Function to filter items.
   */
  @Input() public set customFilter(
    value: ((search: string, headers: DataTableHeader[], items: DataTableItem<any>[]) => DataTableItem<any>[]) | null | undefined
  ) {
    this.dataService.customFilterFn = value;
  }

  public get sortBy() {
    return this.dataService.sortBy$.value;
  }

  /**
   * Can be used to control the sorting manually. Also quite handy for initial sorts
   */
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

  protected readonly hideDefaultFooter$ = new BehaviorSubject(this.settings.hideDefaultFooter);

  protected readonly loading$ = new BehaviorSubject(this.settings.loading);

  protected readonly loadingText$ = new BehaviorSubject(this.settings.loadingText);

  protected readonly noDataText$ = new BehaviorSubject(this.settings.noDataText);

  private readonly hideDefaultHeader$ = new BehaviorSubject(this.settings.hideDefaultHeader);

  private readonly itemKey$ = new BehaviorSubject(this.settings.itemKey);

  protected loadingTextVisible$ = combineLatest([this.loading$, this.paginationService.limitedItems$]).pipe(
    map(([loading, limitedItems]) => loading && limitedItems.length === 0)
  );

  protected noDataTextVisible$ = combineLatest([this.loading$, this.paginationService.limitedItems$]).pipe(
    map(([loading, limitedItems]) => !loading && limitedItems.length === 0)
  );

  protected defaultHeaderVisible$ = combineLatest([this.hideDefaultHeader$, this.dataService.mobile$]).pipe(
    map(([hideDefaultHeader, mobile]) => !hideDefaultHeader && !mobile)
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
}
