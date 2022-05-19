import { InjectionToken } from '@angular/core';
import type { ChipSettings } from './chip.interface';

export const DEFAULT_CHIP_SETTINGS: Required<ChipSettings> = {
  appearance: 'filled',
  filter: false,
  ripple: false,
};

export const CHIP_SETTINGS = new InjectionToken<Required<ChipSettings>>('Chip Settings');
