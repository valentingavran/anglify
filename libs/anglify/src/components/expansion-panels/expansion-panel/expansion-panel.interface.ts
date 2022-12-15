import type { Elevation } from '../../../composables/elevation/elevation.interface';

export type EntireExpansionPanelSettings = {
  /**
   * Designates an elevation applied to the component between 0 and 24. You can find more
   * information on the elevation page.
   */
  elevation: Elevation;
  /**
   * Hide the expand icon in the panel header.
   */
  hideToggle: boolean;
  /**
   * The label in the panel header.
   */
  label: string | undefined;
};

export type ExpansionPanelSettings = Partial<EntireExpansionPanelSettings>;
