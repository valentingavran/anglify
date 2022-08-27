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
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { DATA_TABLE_SETTINGS, DEFAULT_DATA_TABLE_SETTINGS } from './data-table-settings.token';
import { DataTableHeader, DataTableItem, EntireDataTableSettings } from './data-table.interface';
import { DataService } from './services/data.service';
import { ExpansionService } from './services/expansion.service';
import { PaginationService } from './services/pagination.service';
import { SelectionService } from './services/selection.service';
import { createSettingsProvider } from '../../factories/settings.factory';
import { INTERNAL_ICONS } from '../../tokens/internal-icons.token';
import { bindStyleValueToNativeElement } from '../../utils/functions';
import { SlotDirective } from '../common/directives/slot/slot.directive';
import { InternalIconSetDefinition } from '../icon/icon.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-data-table',
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
})
export class DataTableComponent {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;

  /** An array of objects that each describe a header column. */
  @Input() public set headers(headers: DataTableHeader[]) {
    this.dataService.headers$.next(headers);
  }

  public get headers() {
    return this.dataService.headers$.value;
  }

  /** The array of items to display. */
  @Input() public set items(items: DataTableItem[]) {
    this.dataService.items$.next(items);
  }

  public get items() {
    return this.dataService.items$.value;
  }

  /** If true then one can sort on multiple properties. */
  @Input() public set multiSort(value: boolean) {
    this.dataService.multiSort$.next(value);
  }

  public get multiSort() {
    return this.dataService.multiSort$.value;
  }

  /** Text input used to filter items. */
  @Input() public set search(value: string | undefined) {
    this.dataService.search$.next(value);
  }

  public get search() {
    return this.dataService.search$.value;
  }

  /** The current displayed page number (1-indexed). */
  @Input() public set page(value: number) {
    this.paginationService.page$.next(value);
  }

  public get page() {
    return this.paginationService.page$.value;
  }

  /** Hide the default headers. */
  @Input() public set hideDefaultHeader(value: boolean) {
    this.hideDefaultHeader$.next(value);
  }

  public get hideDefaultHeader() {
    return this.hideDefaultHeader$.value;
  }

  /** Hides default footer. */
  @Input() public set hideDefaultFooter(value: boolean) {
    this.hideDefaultFooter$.next(value);
  }

  public get hideDefaultFooter() {
    return this.hideDefaultFooter$.value;
  }

  /** Turns on expandable rows. */
  @Input() public set expandable(value: boolean) {
    this.expansionService.expandable$.next(value);
  }

  public get expandable() {
    return this.expansionService.expandable$.value;
  }

  /** Shows select checkboxes in both the header and rows. */
  @Input() public set selectableRows(value: boolean) {
    this.selectionService.selectableRows$.next(value);
  }

  public get selectableRows() {
    return this.selectionService.selectableRows$.value;
  }

  /** Used for controlling selected rows. */
  @Input() public set selection(value: DataTableItem[]) {
    this.selectionService.selection$.next(value);
  }

  public get selection() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.selectionService.selection$.value;
  }

  /** The property on each item that is used as a unique key. `id` is used by default if available. */
  @Input() public set itemKey(value: string) {
    this.itemKey$.next(value);
  }

  public get itemKey() {
    return this.itemKey$.value;
  }

  /** Changes selection mode to single select. */
  @Input() public set singleSelect(value: boolean) {
    this.selectionService.singleSelect$.next(value);
  }

  public get singleSelect() {
    return this.selectionService.singleSelect$.value;
  }

  /** Displays buttons that allow jumping to the first and last page. */
  @Input() public set showFirstLastPageControls(value: boolean) {
    this.paginationService.showFirstLastPageControls$.next(value);
  }

  public get showFirstLastPageControls() {
    return this.paginationService.showFirstLastPageControls$.value;
  }

  /** Emitted when the selected items change. */
  @Output() public readonly selectionChange = new EventEmitter<DataTableItem[]>();

  public readonly hideDefaultHeader$ = new BehaviorSubject(this.settings.hideDefaultHeader);
  public readonly hideDefaultFooter$ = new BehaviorSubject(this.settings.hideDefaultFooter);

  public readonly itemKey$ = new BehaviorSubject(this.settings.itemKey);

  public constructor(
    @Inject(INTERNAL_ICONS) protected readonly internalIcons: InternalIconSetDefinition,
    @Self() @Inject('anglifyDataTableSettings') public settings: EntireDataTableSettings,
    protected readonly elementRef: ElementRef<HTMLElement>,
    protected readonly selectionService: SelectionService,
    protected readonly expansionService: ExpansionService,
    protected readonly paginationService: PaginationService,
    protected readonly dataService: DataService
  ) {
    this.selectionService.tableComponent = this;

    bindStyleValueToNativeElement(
      this,
      combineLatest([this.dataService.headers$, this.selectionService.selectableRows$]).pipe(
        map(([headers, selectableRows]) => {
          let headerWidths = headers.map(header =>
            header.width ? (typeof header.width === 'number' ? `${header.width}px` : header.width) : '1fr'
          );
          if (selectableRows) headerWidths = ['auto', ...headerWidths];
          return headerWidths;
        }),
        map(widths => widths.join(' '))
      ),
      this.elementRef.nativeElement,
      '--anglify-data-table-header-widths'
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  protected readonly trackByFn = (index: number, item: DataTableItem) => item[this.itemKey$.value] || index;
}
