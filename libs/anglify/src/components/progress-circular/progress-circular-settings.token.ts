import { InjectionToken } from '@angular/core';
import type { EntireProgressCircularSettings, ProgressCircularSettings } from './progress-circular.interface';

export const DEFAULT_PROGRESS_CIRCULAR_SETTINGS: EntireProgressCircularSettings = {
  indeterminate: false,
  rotation: 0,
  value: 0,
};

export const PROGRESS_CIRCULAR_SETTINGS = new InjectionToken<ProgressCircularSettings>('Progress Circular Settings');
