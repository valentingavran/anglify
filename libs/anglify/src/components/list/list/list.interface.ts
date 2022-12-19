export type EntireListSettings = {
  /**
   * Lowers max height of list items.
   */
  dense: boolean;
  /**
   * An alternative styling that reduces `anglify-list-item` width and rounds the corners.
   * Typically used with `anglify-navigation-drawer`.
   */
  nav: boolean;
};

export type ListSettings = Partial<EntireListSettings>;
