import { InjectionToken } from '@angular/core';
import { ExpansionPanelsSettings, EntireExpansionPanelsSettings } from './expansion-panels.interface';

export const DEFAULT_EXPANSION_PANELS_SETTINGS: EntireExpansionPanelsSettings = {
  accordion: false,
  elevation: 2,
  mandatory: false,
  multiple: false,
  max: undefined,
};

export const EXPANSION_PANELS_SETTINGS = new InjectionToken<ExpansionPanelsSettings>('Expansion Panels Settings');
