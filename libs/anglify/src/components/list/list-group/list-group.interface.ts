export type EntireListGroupSettings = {
  /**
   * Control if the group is open by default.
   */
  active: boolean;
  /**
   * If an element that is not in the group gets selected, then the group will be closed
   * automatically by default. With this property this functionality can be deactivated. This will
   * keep the group open until the user closes it manually.
   */
  disableGroupCollapse: boolean;
};

export type ListGroupSettings = Partial<EntireListGroupSettings>;
