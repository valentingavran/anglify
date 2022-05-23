import type { Elevation } from '../../composables/elevation/elevation';
import type { Position } from '../../composables/position/position.interface';

export type MenuMountingPoint = HTMLElement | 'body' | 'parent';

export interface EntireMenuSettings {
  offset: number;
  position: Position;
  elevation: Elevation;
  openOnClick: boolean;
  closeOnOutsideClick: boolean;
  parentWidth: boolean;
}

export type MenuSettings = Partial<EntireMenuSettings>;
