import type { Side } from '../../composables/position/position.interface';

export type MenuMountingPoint = HTMLElement | 'body' | 'parent';

export type EntireMenuSettings = {
  closeOnEscape: boolean;
  closeOnMenuClick: boolean;
  closeOnOutsideClick: boolean;
  disabled: boolean;
  flip: boolean;
  focusMenuWhenOpened: boolean;
  focusable: boolean;
  openOnClick: boolean;
  openOnHover: boolean;
  position: Side;
  trapFocus: boolean;
  value: boolean;
};

export type MenuSettings = Partial<EntireMenuSettings>;
