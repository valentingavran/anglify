import { InjectionToken } from '@angular/core';
import type { DataTableSettings, EntireDataTableSettings } from './data-table.interface';

export const DEFAULT_DATA_TABLE_SETTINGS: EntireDataTableSettings = {
  customFilter: undefined,
  expandable: false,
  hideDefaultHeader: false,
  hideDefaultFooter: false,
  itemKey: 'id',
  multiSort: false,
  page: 1,
  selectableRows: false,
  singleSelect: false,
  showFirstLastPageControls: false,
  loadingText: 'Loading…',
  loading: false,
  mobile: false,
  noDataText: 'No data available',
  showColumnsControl: false,
  headers: [],
  items: [],
  search: undefined,
  selection: [],
  sortBy: [],
};

export const DATA_TABLE_SETTINGS = new InjectionToken<DataTableSettings>('Data Table Settings');
