import { InjectionToken } from '@angular/core';
import type { TooltipSettings } from './tooltip.interface';

export const TOOLTIP_SETTINGS = new InjectionToken<Required<TooltipSettings>>('Tooltip Settings');

export const DEFAULT_TOOLTIP_SETTINGS: Required<TooltipSettings> = {
  position: 'bottom',
  hoverOpenDelay: 0,
  touchOpenDelay: 0,
  hoverCloseDelay: 0,
  touchCloseDelay: 1000,
  mobileTrigger: 'long',
  preventContextMenuOnTouchDevice: false,
  defaultOffset: 10,
  autoCloseOnTouchDevicesAfterDelay: true,
  parentWidth: false,
};
