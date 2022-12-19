export type ChipAppearance = 'filled' | 'outlined';

export type EntireChipSettings = {
  /**
   * The chip’s value.
   */
  active: boolean;
  /**
   * Sets one of several predefined styles.
   */
  appearance: ChipAppearance;
  /**
   * Displays a selection icon when selected.
   */
  filter: boolean;
  /**
   * Turns the ripple effect on or off.
   */
  ripple: boolean;
};

export type ChipSettings = Partial<EntireChipSettings>;
