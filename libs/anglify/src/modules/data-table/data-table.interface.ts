export interface DataTableHeader<T = any> {
  text: string;
  align?: 'start' | 'center' | 'end';
  sortable?: boolean;
  filterable?: boolean;
  value: string;
  width?: number | string;
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
}

export type DataTableSettings = Partial<EntireDataTableSettings>;
