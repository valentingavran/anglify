import { Elevation } from '../../composables/elevation/elevation.interface';

export interface EntireToolbarSettings {
  prominent: boolean;
  collapse: boolean;
  elevation: Elevation;
}

export type ToolbarSettings = Partial<EntireToolbarSettings>;
