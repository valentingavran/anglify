export type DataTableHeader<T = any> = {
  align?: 'center' | 'end' | 'start';
  computeContent?(item: DataTableItem<T>): string;
  filterable?: boolean;
  hidden?: boolean;
  hiddenOnMobile?: boolean;
  sort?(a: DataTableItem<T>, b: DataTableItem<T>, direction: SortSetting['direction']): number;
  sortable?: boolean;
  text: string;
  value: string;
  width?: number | string;
};

export type DataTableItem<
  T = {
    [key: string]: any;
  }
> = T;

export type SortSetting = {
  direction: 'asc' | 'desc';
  value: string;
};

export type EntireDataTableSettings = {
  /**
   * Function to filter items.
   */
  customFilter: ((search: string, headers: DataTableHeader[], items: DataTableItem[]) => DataTableItem[]) | null | undefined;
  /**
   * Turns on expandable rows.
   */
  expandable: boolean;
  /**
   * An array of objects that each describe a header column.
   */
  headers: DataTableHeader[];
  /**
   * Hides default footer.
   */
  hideDefaultFooter: boolean;
  /**
   * Hide the default headers.
   */
  hideDefaultHeader: boolean;
  /**
   * The property on each item that is used as a unique key. `id` is used by default if available.
   */
  itemKey: string;
  /**
   * The array of items to display.
   */
  items: DataTableItem[];
  /**
   * Displays a Linear Progress if this property is set to `true`. If there are no entries, then a loading text is also displayed.
   */
  loading: boolean;
  /**
   * Text shown when loading is `true` and no items are provided.
   */
  loadingText: string;
  /**
   * Used to toggle between regular Data Table view and mobile view.
   */
  mobile: boolean;
  /**
   * If true then one can sort on multiple properties.
   */
  multiSort: boolean;
  /**
   * Text shown when no items are provided to the component and when loading is `false`.
   */
  noDataText: string;
  /**
   * The current displayed page number (1-indexed).
   */
  page: number;
  /**
   * Text input used to filter items.
   */
  search: string | undefined;
  /**
   * Shows select checkboxes in both the header and rows.
   */
  selectableRows: boolean;
  /**
   * Used for controlling selected rows.
   */
  selection: DataTableItem[];
  /**
   * Shows a button with a menu that allows the user to toggle columns.
   */
  showColumnsControl: boolean;
  /**
   * Displays buttons that allow jumping to the first and last page.
   */
  showFirstLastPageControls: boolean;
  /**
   * Changes selection mode to single select.
   */
  singleSelect: boolean;
  /**
   * Can be used to control the sorting manually. Also quite handy for initial sorts
   */
  sortBy: SortSetting[];
};

export type DataTableSettings = Partial<EntireDataTableSettings>;
