import { RippleOrigin } from '../../composables/ripple/ripple.interface';

export interface EntireRadioButtonSettings {
  disabled: boolean;
  ripple: boolean;
  labelPosition: RadioLabelPosition;
  rippleOrigin: RippleOrigin;
  state: boolean;
}

export type RadioButtonSettings = Partial<EntireRadioButtonSettings>;

export type RadioLabelPosition = 'before' | 'after';
