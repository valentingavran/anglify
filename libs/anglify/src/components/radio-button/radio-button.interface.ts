import type { RippleOrigin } from '../../composables/ripple/ripple.interface';

export type EntireRadioButtonSettings = {
  /**
   * Removes the ability to click or target the component.
   */
  disabled: boolean;
  /**
   * Changes the position of the label.
   */
  labelPosition: RadioLabelPosition;
  /**
   * Sets the component’s name attribute.
   */
  name: string;
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
  /**
   * The input’s value.
   */
  value: any;
};

export type RadioButtonSettings = Partial<EntireRadioButtonSettings>;

export type RadioLabelPosition = 'after' | 'before';
