import type { BooleanLike } from '../../utils/interfaces';

export interface CheckboxSettings {
  disabled?: BooleanLike;
  checked?: BooleanLike;
  ripple?: BooleanLike;
  labelPosition?: LabelPosition;
  rippleOrigin?: RippleOrigin;
}

export type LabelPosition = 'before' | 'after';

export type RippleOrigin = 'center' | undefined;
