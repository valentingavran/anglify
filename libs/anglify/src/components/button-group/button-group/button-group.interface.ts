export type EntireButtonGroupSettings = {
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
  /**
   * With this property the toggle function can be deactivated. This means that the items no longer save a state.
   */
  stateless: boolean;
};

export type ButtonGroupSettings = Partial<EntireButtonGroupSettings>;
