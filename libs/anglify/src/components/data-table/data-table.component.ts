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
import { BehaviorSubject, combineLatest, map } from 'rxjs';
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
import { ProgressLinearComponent } from '../progress-linear/progress-linear.component';
import { SelectComponent } from '../select/select.component';
import { DATA_TABLE_SETTINGS, DEFAULT_DATA_TABLE_SETTINGS } from './data-table-settings.token';
import { EntireDataTableSettings } from './data-table.interface';
import type { DataTableHeader, DataTableItem } from './data-table.interface';
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
  ],
})
export class DataTableComponent {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;

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

  /**
   * Emitted when the selected items change.
   */
  @Output() public readonly selectionChange = new EventEmitter<DataTableItem[]>();

  public readonly hideDefaultHeader$ = new BehaviorSubject(this.settings.hideDefaultHeader);

  public readonly hideDefaultFooter$ = new BehaviorSubject(this.settings.hideDefaultFooter);

  public readonly loading$ = new BehaviorSubject(this.settings.loading);

  public readonly loadingText$ = new BehaviorSubject(this.settings.loadingText);

  public readonly noDataText$ = new BehaviorSubject(this.settings.noDataText);

  public loadingTextVisible$ = combineLatest([this.loading$, this.paginationService.limitedItems$]).pipe(
    map(([loading, limitedItems]) => loading && limitedItems.length === 0)
  );

  public noDataTextVisible$ = combineLatest([this.loading$, this.paginationService.limitedItems$]).pipe(
    map(([loading, limitedItems]) => !loading && limitedItems.length === 0)
  );

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
