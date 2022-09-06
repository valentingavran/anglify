import { InjectionToken } from '@angular/core';
import type { CardSettings, EntireCardSettings } from './card.interface';

export const DEFAULT_CARD_SETTINGS: EntireCardSettings = {
  elevation: 1,
  ripple: false,
  outlined: false,
};

export const CARD_SETTINGS = new InjectionToken<CardSettings>('Card Settings');
