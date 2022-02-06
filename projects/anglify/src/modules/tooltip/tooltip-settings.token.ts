import { InjectionToken } from '@angular/core';
import { TooltipSettings } from './tooltip.interface';

export const TOOLTIP_SETTINGS = new InjectionToken<TooltipSettings>('Tooltip Settings');
