import type { RippleOrigin } from '../../composables/ripple/ripple.interface';
import type { IconSet } from '../icon/icon.interface';

export type LabelPosition = 'after' | 'before';

export type EntireCheckboxSettings = {
  /**
   * The input’s value.
   */
  checked: boolean | undefined;
  /**
   * Disable the input.
   */
  disabled: boolean;
  focusable: boolean;
  /**
   * Changes the position of the label.
   */
  labelPosition: LabelPosition;
  /**
   * Puts input in readonly state.
   */
  readonly: boolean;
  /**
   * Turns the ripple effect on or off.
   */
  ripple: boolean;
  /**
   * Defines whether the ripple starts in the middle of the component or where the mouse click occurs.
   */
  rippleOrigin: RippleOrigin;
  /**
   * Controls whether to display the focus and hover styles for this component.
   */
  state: boolean;
};

export type CheckboxSettings = Partial<EntireCheckboxSettings>;

export type CheckboxIcons = {
  iconOffState: string;
  iconOnState: string;
  iconPack?: IconSet;
};
