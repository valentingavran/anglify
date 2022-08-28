import { InjectionToken } from '@angular/core';
import type { EntireProgressLinearSettings, ProgressLinearSettings } from './progress-linear.interface';

export const DEFAULT_PROGRESS_LINEAR_SETTINGS: EntireProgressLinearSettings = {
  active: true,
  bufferValue: 100,
  indeterminate: false,
  stream: false,
  value: 0,
};

export const PROGRESS_LINEAR_SETTINGS = new InjectionToken<ProgressLinearSettings>('Progress Linear Settings');
