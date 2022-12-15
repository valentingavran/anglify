import { InjectionToken } from '@angular/core';
import type { EntireExpansionPanelSettings, ExpansionPanelSettings } from './expansion-panel.interface';

export const DEFAULT_EXPANSION_PANEL_SETTINGS: EntireExpansionPanelSettings = {
  elevation: 2,
  hideToggle: false,
  label: undefined,
};

export const EXPANSION_PANEL_SETTINGS = new InjectionToken<ExpansionPanelSettings>('Expansion Panel Settings');
