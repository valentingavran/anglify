import { InjectionToken } from '@angular/core';
import { DataTableSettings, EntireDataTableSettings } from './data-table.interface';

export const DEFAULT_DATA_TABLE_SETTINGS: EntireDataTableSettings = {
  expandable: false,
  hideDefaultHeader: false,
  hideDefaultFooter: false,
  itemKey: 'id',
  multiSort: false,
  page: 1,
  selectableRows: false,
  singleSelect: false,
};

export const DATA_TABLE_SETTINGS = new InjectionToken<DataTableSettings>('Data Table Settings');
