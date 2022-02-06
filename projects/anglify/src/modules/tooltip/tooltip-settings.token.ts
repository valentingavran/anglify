import { InjectionToken } from '@angular/core';
import { TooltipSettings } from './tooltip.interface';

export const TOOLTIP_SETTINGS = new InjectionToken<TooltipSettings>('Tooltip Settings');

export const DEFAULT_TOOLTIP_SETTINGS: Required<TooltipSettings> = {
  position: 'BOTTOM',
  openDelay: 0,
  closeDelay: 0,
  mobileTrigger: 'long',
  preventContextMenuOnTouchDevice: false,
  defaultOffset: 10,
};
