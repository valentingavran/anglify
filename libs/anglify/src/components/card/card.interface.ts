import type { Elevation } from '../../composables/elevation/elevation.interface';

export interface EntireCardSettings {
  elevation: Elevation;
  ripple: boolean;
  outlined: boolean;
}

export type CardSettings = Partial<EntireCardSettings>;
