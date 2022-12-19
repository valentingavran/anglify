export type EntireButtonGroupItemSettings = {
  /**
   * Disables this item.
   */
  disabled: boolean;
  /**
   * Makes the item not focusable and disables the ripple.
   */
  readonly: boolean;
  /**
   * Turns the ripple effect on or off.
   */
  ripple: boolean;
};

export type ButtonGroupItemSettings = Partial<EntireButtonGroupItemSettings>;
