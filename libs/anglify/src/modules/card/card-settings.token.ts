import { InjectionToken } from '@angular/core';
import type { CardSettings } from './card.interface';

export const DEFAULT_CARD_SETTINGS: Required<CardSettings> = {
  elevation: 1,
};

export const CARD_SETTINGS = new InjectionToken<Required<CardSettings>>('Card Settings');
