import type { Position } from '../../composables/position/position.interface';
import type { InputAppearance } from '../input/input.interface';

export type EntireComboboxSettings = {
  /**
   * Forces label to always be in floating mode.
   */
  alwaysFloatingLabel: boolean;
  /**
   * Sets one of the two predefined input styles (`filled` or `outlined`).
   */
  appearance: InputAppearance;
  /**
   * Add input clear functionality (appends an clear icon).
   */
  clearable: boolean;
  /**
   * Reduces the input height.
   */
  dense: boolean;
  /**
   * Disables the input.
   */
  disabled: boolean;
  /**
   * Sets the position of the menu.
   */
  dropdownPosition: Position;
  /**
   * Puts the input in a manual error state.
   */
  error: string | undefined;
  /**
   * Flips the menu to the opposite side of the input if there is not enough space on the preferred side.
   */
  flip: boolean;
  /**
   * Hides hint and validation errors.
   */
  hideDetails: boolean;
  /**
   * Hint text.
   */
  hint: string | undefined;
  /**
   * Key to use for the value. Required if items is an array of objects. It's assumed
   * that items is an array of primitives if this is not set.
   */
  itemTextKey: string | undefined;
  /**
   * Key to use for the value. Whole item is used as value if this is not set.
   */
  itemValueKey: string | undefined;
  /**
   * Can be an array of objects or array of strings/numbers.
   */
  items: any[];
  /**
   * Sets the input label.
   */
  label: string | undefined;
  /**
   * Changes select to multiple. Accepts array for value.
   */
  multiple: boolean;
  /**
   * Display text when there is no data.
   */
  noDataText: string;
  /**
   * Forces hint to always be visible.
   */
  persistentHint: boolean;
  /**
   * Sets the input’s placeholder text
   */
  placeholder: string | undefined;
};

export type ComboboxSettings = Partial<EntireComboboxSettings>;
