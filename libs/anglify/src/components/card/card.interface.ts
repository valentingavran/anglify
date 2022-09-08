import { type Elevation } from '../../composables/elevation/elevation.interface';

export type EntireCardSettings = {
  elevation: Elevation;
  outlined: boolean;
  ripple: boolean;
};

export type CardSettings = Partial<EntireCardSettings>;
