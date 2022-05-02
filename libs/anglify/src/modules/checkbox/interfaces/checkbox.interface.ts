import { RippleOrigin } from 'libs/anglify/src/composables/ripple/ripple.interface';

export interface CheckboxSettings {
  disabled?: boolean;
  checked?: boolean;
  ripple?: boolean;
  labelPosition?: LabelPosition;
  rippleOrigin?: RippleOrigin;
  state?: boolean;
}

export type LabelPosition = 'before' | 'after';
