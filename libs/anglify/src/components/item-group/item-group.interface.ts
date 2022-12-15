export type EntireItemGroupSettings = {
  /**
   * Forces a value to always be selected (if available).
   */
  mandatory: boolean;
  /**
   * Sets a maximum number of selections that can be made.
   */
  max: number | undefined;
  /**
   * Allow multiple selections.
   */
  multiple: boolean;
};

export type ItemGroupSettings = Partial<EntireItemGroupSettings>;
