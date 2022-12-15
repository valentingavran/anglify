import { InjectionToken } from '@angular/core';
import type { EntireListItemSettings } from './list-item.interface';

export const DEFAULT_LIST_ITEM_SETTINGS: EntireListItemSettings = {
  active: false,
  highlight: false,
  dense: false,
  disabled: false,
  selectable: false,
  routerLink: null,
  focusable: true,
  inactive: false,
  exact: false,
  ripple: true,
  state: true,
};

export const LIST_ITEM_SETTINGS = new InjectionToken<EntireListItemSettings>('List Item Settings');
