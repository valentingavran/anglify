import { InjectionToken } from '@angular/core';
import { PositionSettings } from './position.interface';

export const POSITION_SETTINGS = new InjectionToken<PositionSettings>('Position settings');
