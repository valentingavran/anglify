import type { Position } from '../../composables/position/position.interface';

export type TooltipTouchTrigger = 'long' | 'short';

export type TooltipMountingPoint = HTMLElement | 'body' | 'parent';

export type EntireTooltipSettings = {
  autoCloseOnTouchDevicesAfterDelay: boolean;
  contentClass: string | undefined;
  defaultOffset: number;
  disabled: boolean;
  flip: boolean;
  hoverCloseDelay: number;
  hoverOpenDelay: number;
  /**
   * Allows you to define whether the tooltip is opened with a quick press or with a long press.
   */
  mobileTrigger: TooltipTouchTrigger;
  mountingPoint: TooltipMountingPoint;
  parentWidth: boolean;
  position: Position;
  /**
   * Prevents the context menu from opening when the host is long pressed.
   */
  preventContextMenuOnTouchDevice: boolean;
  shift: boolean;
  touchCloseDelay: number;
  touchOpenDelay: number;
};

export type TooltipSettings = Partial<EntireTooltipSettings>;
