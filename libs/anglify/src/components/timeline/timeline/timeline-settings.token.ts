import { InjectionToken } from '@angular/core';
import type { EntireTimelineSettings } from './timeline.interface';

export const DEFAULT_TIMELINE_SETTINGS: EntireTimelineSettings = {
  dense: false,
  reverse: false,
};
export const TIMELINE_SETTINGS = new InjectionToken<EntireTimelineSettings>('Timeline Settings');
