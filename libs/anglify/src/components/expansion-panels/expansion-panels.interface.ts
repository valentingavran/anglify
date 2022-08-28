import { Elevation } from '../../composables/elevation/elevation.interface';

export interface EntireExpansionPanelsSettings {
  accordion: boolean;
  elevation: Elevation;
  mandatory: boolean;
  multiple: boolean;
  max: number | undefined;
}

export type ExpansionPanelsSettings = Partial<EntireExpansionPanelsSettings>;
