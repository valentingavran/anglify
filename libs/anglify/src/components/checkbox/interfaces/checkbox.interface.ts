import type { RippleOrigin } from '../../../composables/ripple/ripple.interface';

export type LabelPosition = 'after' | 'before';

export type EntireCheckboxSettings = {
  checked: boolean | undefined;
  disabled: boolean;
  labelPosition: LabelPosition;
  readonly: boolean;
  ripple: boolean;
  rippleOrigin: RippleOrigin;
  state: boolean;
};

export type CheckboxSettings = Partial<EntireCheckboxSettings>;
