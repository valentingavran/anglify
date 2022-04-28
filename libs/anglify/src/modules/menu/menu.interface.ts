import type { Elevation } from '../../composables/elevation/elevation';
import type { Position } from '../../composables/position/position.interface';

export interface MenuSettings {
  offset?: number;
  position?: Position;
  elevation?: Elevation;
  openOnClick?: boolean;
  closeOnOutsideClick?: boolean;
}

export type MenuMountingPoint = HTMLElement | 'body' | 'parent';
