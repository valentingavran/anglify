import type { StepperOrientation } from '../stepper-settings.service';

export type EntireStepperSettings = {
  /**
   * Specify whether it is possible to navigate between steps by clicking on the individual step headers.
   */
  headerNavigation: boolean;
  /**
   * Whether the steps should be listed vertically or horizontally.
   */
  orientation: StepperOrientation;
  /**
   * Shows or hides the line between the step headers.
   */
  stepConnectionLine: boolean;
};

export type StepperSettings = Partial<EntireStepperSettings>;
