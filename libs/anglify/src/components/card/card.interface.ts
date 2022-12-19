import type { Elevation } from '../../composables/elevation/elevation.interface';

export type EntireCardSettings = {
  /**
   * Designates an elevation applied to the component between 0 and 24. You can find more
   * information on the elevation page.
   */
  elevation: Elevation;
  /**
   * Removes elevation (box-shadow) and adds a thin border.
   */
  outlined: boolean;
  /**
   * Turns the ripple effect on or off.
   */
  ripple: boolean;
};

export type CardSettings = Partial<EntireCardSettings>;
