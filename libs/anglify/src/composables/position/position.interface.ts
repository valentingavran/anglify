import type { Placement } from '@floating-ui/dom';

export type PositionSettings = {
  host: HTMLElement;
};

export type Position = Placement;

export const focusableElementsString =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex]:not([tabindex="-1"]), *[contenteditable]';
