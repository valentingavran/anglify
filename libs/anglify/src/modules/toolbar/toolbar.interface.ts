import { Elevation } from '../../composables/elevation/elevation.interface';
import { BooleanLike } from '../../utils/interfaces';

export interface EntireToolbarSettings {
  prominent: BooleanLike;
  collapse: BooleanLike;
  elevation: Elevation;
}

export type ToolbarSettings = Partial<EntireToolbarSettings>;
