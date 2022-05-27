import type { Position } from '../../composables/position/position.interface';

export type TooltipTouchTrigger = 'short' | 'long';

export type TooltipMountingPoint = HTMLElement | 'body' | 'parent';

export interface EntireTooltipSettings {
  position: Position;
  hoverOpenDelay: number;
  touchOpenDelay: number;
  hoverCloseDelay: number;
  touchCloseDelay: number;
  /** Prevents the context menu from opening when the host is long pressed. */
  preventContextMenuOnTouchDevice: boolean;
  /** Allows you to define whether the tooltip is opened with a quick press or with a long press. */
  mobileTrigger: TooltipTouchTrigger;
  defaultOffset: number;
  autoCloseOnTouchDevicesAfterDelay: boolean;
  parentWidth: boolean;
  flip: boolean;
  shift: boolean;
  mountingPoint: TooltipMountingPoint;
  contentClass: string | undefined;
}

export type TooltipSettings = Partial<EntireTooltipSettings>;
