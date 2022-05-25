import { RippleOrigin } from '../../../composables/ripple/ripple.interface';

export type LabelPosition = 'before' | 'after';

export interface EntireCheckboxSettings {
  disabled: boolean;
  checked: boolean;
  ripple: boolean;
  labelPosition: LabelPosition;
  rippleOrigin: RippleOrigin;
  state: boolean;
  readonly: boolean;
}

export type CheckboxSettings = Partial<EntireCheckboxSettings>;
