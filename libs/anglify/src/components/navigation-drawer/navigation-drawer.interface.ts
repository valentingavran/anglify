export type NavigationDrawerMode = 'modal' | 'standard';

export type EntireNavigationDrawerSettings = {
  /**
   * Modal drawer will be closed on item clicks if this property is set.
   */
  closeOnItemClick: boolean;
  /**
   * Changes the Navigation Drawer mode (modal or standard).
   */
  mode: NavigationDrawerMode;
  /**
   * Control whether the NavigationDrawer is opened or not.
   */
  value: boolean;
};

export type NavigationDrawerSettings = Partial<EntireNavigationDrawerSettings>;
