import { RippleOrigin } from '../../composables/ripple/ripple.interface';

export interface RadioButtonSettings {
  disabled?: boolean;
  ripple?: boolean;
  labelPosition?: RadioLabelPosition;
  rippleOrigin?: RippleOrigin;
  state?: boolean;
}

export type RadioLabelPosition = 'before' | 'after';
