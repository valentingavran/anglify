export type DataTableHeader<T = any> = {
  align?: 'center' | 'end' | 'start';
  computeContent?(item: DataTableItem<T>): string;
  filterable?: boolean;
  sort?(a: DataTableItem<T>, b: DataTableItem<T>): number;
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
  expandable: boolean;
  hideDefaultFooter: boolean;
  hideDefaultHeader: boolean;
  itemKey: string;
  loading: boolean;
  loadingText: string;
  multiSort: boolean;
  noDataText: string;
  page: number;
  selectableRows: boolean;
  showFirstLastPageControls: boolean;
  singleSelect: boolean;
};

export type DataTableSettings = Partial<EntireDataTableSettings>;
