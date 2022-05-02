import { RippleOrigin } from '../../composables/ripple/ripple.interface';
import type { BooleanLike } from '../../utils/interfaces';

export interface RadioButtonSettings {
  disabled?: BooleanLike;
  ripple?: BooleanLike;
  labelPosition?: RadioLabelPosition;
  rippleOrigin?: RippleOrigin;
  state?: boolean;
}

export type RadioLabelPosition = 'before' | 'after';
