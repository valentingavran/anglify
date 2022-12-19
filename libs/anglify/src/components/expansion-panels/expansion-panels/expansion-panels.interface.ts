import type { Elevation } from '../../../composables/elevation/elevation.interface';

export type EntireExpansionPanelsSettings = {
  accordion: boolean;
  elevation: Elevation;
  mandatory: boolean;
  max: number | undefined;
  multiple: boolean;
};

export type ExpansionPanelsSettings = Partial<EntireExpansionPanelsSettings>;
