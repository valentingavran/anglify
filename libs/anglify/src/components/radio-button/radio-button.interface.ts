import type { RippleOrigin } from '../../composables/ripple/ripple.interface';

export type EntireRadioButtonSettings = {
  disabled: boolean;
  labelPosition: RadioLabelPosition;
  ripple: boolean;
  rippleOrigin: RippleOrigin;
  state: boolean;
};

export type RadioButtonSettings = Partial<EntireRadioButtonSettings>;

export type RadioLabelPosition = 'after' | 'before';
