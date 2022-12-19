import { InjectionToken } from '@angular/core';
import type { ButtonGroupSettings, EntireButtonGroupSettings } from './button-group.interface';

export const DEFAULT_BUTTON_GROUP_SETTINGS: EntireButtonGroupSettings = {
  mandatory: false,
  max: undefined,
  multiple: false,
  stateless: false,
};

export const BUTTON_GROUP_SETTINGS = new InjectionToken<ButtonGroupSettings>('Button Group Settings');
