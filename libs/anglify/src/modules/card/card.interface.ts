import type { Elevation } from '../../composables/elevation/elevation';

export interface EntireCardSettings {
  elevation: Elevation;
  ripple: boolean;
}

export type CardSettings = Partial<EntireCardSettings>;
