import { InjectionToken } from '@angular/core';
import type { IconSettings } from './icon.interface';

export const DEFAULT_ICON_SETTINGS: Required<IconSettings> = {
  defaultSet: 'mdi',
  svgIconSets: {},
  internalIcons: {},
  defaultSize: 'regular',
};

export const ICON_SETTINGS = new InjectionToken<IconSettings>('Icon Settings');
