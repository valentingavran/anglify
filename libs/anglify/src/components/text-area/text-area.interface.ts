import type { InputAppearance } from '../input/input.interface';

export type EntireTextAreaSettings = {
  /**
   * Forces label to always be in floating mode.
   */
  alwaysFloatingLabel: boolean;
  /**
   * Sets one of the two predefined input styles (`filled` or `outlined`).
   */
  appearance: InputAppearance;
  /**
   * Creates counter for input length. The maximum length can be set using the `maxlength` property on the `anglfyInput` directive.
   */
  counter: boolean;
  /**
   * Puts the input in a manual error state.
   */
  error: string | undefined;
  /**
   * Hides hint and validation errors.
   */
  hideDetails: boolean;
  /**
   * Hint text.
   */
  hint: string | undefined;
  /**
   * Sets input label.
   */
  label: string | undefined;
  /**
   * Forces hint to always be visible.
   */
  persistentHint: boolean;
};

export type TextAreaSettings = Partial<EntireTextAreaSettings>;
