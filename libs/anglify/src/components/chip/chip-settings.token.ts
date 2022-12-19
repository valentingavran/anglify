import { InjectionToken } from '@angular/core';
import type { ChipSettings, EntireChipSettings } from './chip.interface';

export const DEFAULT_CHIP_SETTINGS: EntireChipSettings = {
  appearance: 'filled',
  filter: false,
  ripple: false,
  active: false,
};

export const CHIP_SETTINGS = new InjectionToken<ChipSettings>('Chip Settings');
