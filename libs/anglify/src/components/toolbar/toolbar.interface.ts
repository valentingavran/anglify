import type { Elevation } from '../../composables/elevation/elevation.interface';

export type EntireToolbarSettings = {
  collapse: boolean;
  elevation: Elevation;
  prominent: boolean;
};

export type ToolbarSettings = Partial<EntireToolbarSettings>;
