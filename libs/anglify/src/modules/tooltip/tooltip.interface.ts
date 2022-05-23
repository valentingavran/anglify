import type { Position } from '../../composables/position/position.interface';

export type TooltipTouchTrigger = 'short' | 'long';

export type TooltipMountingPoint = HTMLElement | 'body' | 'parent';

export interface EntireTooltipSettings {
  position: Position;
  hoverOpenDelay: number;
  touchOpenDelay: number;
  hoverCloseDelay: number;
  touchCloseDelay: number;
  preventContextMenuOnTouchDevice: boolean;
  mobileTrigger: TooltipTouchTrigger;
  defaultOffset: number;
  autoCloseOnTouchDevicesAfterDelay: boolean;
  parentWidth: boolean;
  flip: boolean;
  shift: boolean;
}

export type TooltipSettings = Partial<EntireTooltipSettings>;
