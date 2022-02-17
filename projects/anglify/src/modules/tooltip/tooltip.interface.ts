export type TooltipTouchTrigger = 'short' | 'long';

export type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

export type TooltipMountingPoint = HTMLElement | 'body' | 'parent';

export interface TooltipSettings {
  position?: TooltipPosition;
  hoverOpenDelay?: number;
  touchOpenDelay?: number;
  hoverCloseDelay?: number;
  touchCloseDelay?: number;
  preventContextMenuOnTouchDevice?: boolean;
  mobileTrigger?: TooltipTouchTrigger;
  defaultOffset?: number;
  autoCloseOnTouchDevicesAfterDelay?: boolean;
}
