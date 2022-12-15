import { InjectionToken } from '@angular/core';
import type { ButtonGroupItemSettings, EntireButtonGroupItemSettings } from './button-group-item.interface';

export const DEFAULT_BUTTON_GROUP_ITEM_SETTINGS: EntireButtonGroupItemSettings = {
  disabled: false,
  readonly: false,
  ripple: true,
};

export const BUTTON_GROUP_ITEM_SETTINGS = new InjectionToken<ButtonGroupItemSettings>('Button Group Item Settings');
