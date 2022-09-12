import type { Elevation } from '../../composables/elevation/elevation.interface';
import type { Position } from '../../composables/position/position.interface';

export type MenuMountingPoint = HTMLElement | 'body' | 'parent';

export type EntireMenuSettings = {
  closeOnOutsideClick: boolean;
  elevation: Elevation;
  flip: boolean;
  offset: number;
  openOnClick: boolean;
  parentWidth: boolean;
  position: Position;
};

export type MenuSettings = Partial<EntireMenuSettings>;
