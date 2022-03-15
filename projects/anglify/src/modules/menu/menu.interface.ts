import { Position } from '../../composables/position/position.interface';
import { Elevation } from '../../composables/elevation/elevation';

export interface MenuSettings {
  offset?: number;
  position?: Position;
  elevation?: Elevation;
}
