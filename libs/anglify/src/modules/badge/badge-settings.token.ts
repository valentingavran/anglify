import { InjectionToken } from '@angular/core';
import { BadgeSettings } from './badge.interface';

export const DEFAULT_BADGE_SETTINGS: Required<BadgeSettings> = {
  border: false,
  position: 'top-end',
};
export const BADGE_SETTINGS = new InjectionToken<Required<BadgeSettings>>('Badge Settings');
