import { InjectionToken } from '@angular/core';
import type { EntireSliderSettings, SliderSettings } from './slider.interface';

export const DEFAULT_SLIDER_SETTINGS: EntireSliderSettings = {
  disabled: false,
  max: 100,
  min: 0,
  ripple: true,
  state: true,
  step: 1,
  ticks: false,
  tooltip: false,
  value: 0,
};

export const SLIDER_SETTINGS = new InjectionToken<SliderSettings>('Slider Settings');
