import { InjectionToken } from '@angular/core';
import type { EntireTimelineItemSettings } from './timeline-item.interface';

export const DEFAULT_TIMELINE_ITEM_SETTINGS: EntireTimelineItemSettings = {
  topConnectionLineVisible: true,
  bottomConnectionLineVisible: true,
  alignment: 'none',
  hideOpposite: false,
};
export const TIMELINE_ITEM_SETTINGS = new InjectionToken<EntireTimelineItemSettings>('Timeline Item Settings');
