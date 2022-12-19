import type { Elevation } from '../../composables/elevation/elevation.interface';

export type EntireToolbarSettings = {
  /**
   * Designates the toolbar as an app bar.
   */
  app: boolean;
  /**
   * Puts the toolbar into a collapsed state reducing its maximum width.
   */
  collapse: boolean;
  /**
   * Designates an elevation applied to the component between 0 and 24. You can find more
   * information on the elevation page.
   */
  elevation: Elevation;
  /**
   * Increases the height of the toolbar.
   */
  prominent: boolean;
};

export type ToolbarSettings = Partial<EntireToolbarSettings>;
