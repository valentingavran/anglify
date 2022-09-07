export interface DataTableHeader<T = any> {
  text: string;
  align?: 'start' | 'center' | 'end';
  sortable?: boolean;
  filterable?: boolean;
  value: string;
  width?: number | string;
  sort?: (a: DataTableItem<T>, b: DataTableItem<T>) => number;
}

export type DataTableItem<
  T = {
    [key: string]: any;
  }
> = T;

export interface SortSetting {
  value: string;
  direction: 'asc' | 'desc';
}

export interface EntireDataTableSettings {
  multiSort: boolean;
  page: number;
  hideDefaultHeader: boolean;
  hideDefaultFooter: boolean;
  expandable: boolean;
  selectableRows: boolean;
  itemKey: string;
  singleSelect: boolean;
  showFirstLastPageControls: boolean;
  loadingText: string;
  loading: boolean;
  noDataText: string;
}

export type DataTableSettings = Partial<EntireDataTableSettings>;
