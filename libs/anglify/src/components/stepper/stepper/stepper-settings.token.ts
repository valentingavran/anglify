import { InjectionToken } from '@angular/core';
import type { EntireStepperSettings } from './stepper.interface';

export const DEFAULT_STEPPER_SETTINGS: EntireStepperSettings = {
  headerNavigation: true,
  orientation: 'vertical',
  stepConnectionLine: true,
};
export const STEPPER_SETTINGS = new InjectionToken<EntireStepperSettings>('Stepper Settings');
