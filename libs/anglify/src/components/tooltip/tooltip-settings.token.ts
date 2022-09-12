import { InjectionToken } from '@angular/core';
import type { EntireTooltipSettings, TooltipSettings } from './tooltip.interface';

export const DEFAULT_TOOLTIP_SETTINGS: EntireTooltipSettings = {
  position: 'bottom',
  hoverOpenDelay: 0,
  touchOpenDelay: 0,
  hoverCloseDelay: 0,
  touchCloseDelay: 1_000,
  mobileTrigger: 'long',
  preventContextMenuOnTouchDevice: false,
  defaultOffset: 10,
  autoCloseOnTouchDevicesAfterDelay: true,
  parentWidth: false,
  flip: true,
  shift: true,
  mountingPoint: 'parent',
  contentClass: undefined,
  disabled: false,
};

export const TOOLTIP_SETTINGS = new InjectionToken<TooltipSettings>('Tooltip Settings');
