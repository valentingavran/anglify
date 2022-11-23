import type { RippleOrigin } from '../../composables/ripple/ripple.interface';
import type { IconSet } from '../icon/icon.interface';

export type LabelPosition = 'after' | 'before';

export type EntireCheckboxSettings = {
  checked: boolean | undefined;
  disabled: boolean;
  focusable: boolean;
  labelPosition: LabelPosition;
  readonly: boolean;
  ripple: boolean;
  rippleOrigin: RippleOrigin;
  state: boolean;
};

export type CheckboxSettings = Partial<EntireCheckboxSettings>;

export type CheckboxIcons = {
  iconOffState: string;
  iconOnState: string;
  iconPack?: IconSet;
};
