import { InjectionToken } from '@angular/core';
import type { EntireSimpleTableSettings } from './simple-table.interface';

export const DEFAULT_SIMPLE_TABLE_SETTINGS: EntireSimpleTableSettings = {
  fixedFooter: false,
  fixedHeader: false,
  fixedHeight: null,
};
export const SIMPLE_TABLE_SETTINGS = new InjectionToken<EntireSimpleTableSettings>('Simple Table Settings');
