export type TooltipTouchTrigger = 'short' | 'long';

export type TooltipPosition = 'TOP' | 'RIGHT' | 'BOTTOM' | 'LEFT';

export interface TooltipSettings {
  position?: TooltipPosition;
  openDelay?: number;
  closeDelay?: number;
  preventContextMenuOnTouchDevice?: boolean;
  mobileTrigger?: TooltipTouchTrigger;
  defaultOffset?: number;
}
