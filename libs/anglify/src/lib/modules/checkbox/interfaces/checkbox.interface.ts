import { BooleanLike } from '../../../utils/interfaces';
import { OverlayRippleOrigin } from '../../overlay/overlay.interface';

export interface CheckboxSettings {
  disabled?: BooleanLike;
  checked?: BooleanLike;
  ripple?: BooleanLike;
  labelPosition?: LabelPosition;
  rippleOrigin?: OverlayRippleOrigin;
}

export type LabelPosition = 'before' | 'after';
