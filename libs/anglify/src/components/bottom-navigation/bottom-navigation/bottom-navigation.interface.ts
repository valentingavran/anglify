export type EntireBottomNavigationSettings = {
  /**
   * Force items to take up all available space.
   */
  grow: boolean;
  /**
   * Hides text of items when they are not active.
   */
  shift: boolean;
};

export type BottomNavigationSettings = Partial<EntireBottomNavigationSettings>;
