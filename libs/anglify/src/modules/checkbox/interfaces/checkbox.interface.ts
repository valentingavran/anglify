import { RippleOrigin } from 'libs/anglify/src/composables/ripple/ripple.interface';
import { BooleanLike } from '../../../utils/interfaces';

export interface CheckboxSettings {
  disabled?: BooleanLike;
  checked?: BooleanLike;
  ripple?: BooleanLike;
  labelPosition?: LabelPosition;
  rippleOrigin?: RippleOrigin;
  state?: boolean;
}

export type LabelPosition = 'before' | 'after';
