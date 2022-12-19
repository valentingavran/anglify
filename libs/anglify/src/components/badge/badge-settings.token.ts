import { InjectionToken } from '@angular/core';
import type { BadgeSettings, EntireBadgeSettings } from './badge.interface';

export const DEFAULT_BADGE_SETTINGS: EntireBadgeSettings = {
  border: false,
  position: 'top-end',
  horizontalOffset: 0,
  verticalOffset: 0,
  value: true,
  content: undefined,
};
export const BADGE_SETTINGS = new InjectionToken<BadgeSettings>('Badge Settings');
