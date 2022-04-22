import type { BooleanLike } from '../../utils/interfaces';
import { OverlayRippleOrigin } from '../overlay/overlay.interface';

export interface RadioButtonSettings {
  disabled?: BooleanLike;
  checked?: BooleanLike;
  ripple?: BooleanLike;
  labelPosition?: RadioLabelPosition;
  rippleOrigin?: OverlayRippleOrigin;
}

export type RadioLabelPosition = 'before' | 'after';
