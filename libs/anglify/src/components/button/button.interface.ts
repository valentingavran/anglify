export type ButtonAppearance = 'contained' | 'extended-fab' | 'fab' | 'icon' | 'outlined' | 'text';

export type EntireButtonSettings = {
  /**
   * Sets one of several predefined styles.
   */
  appearance: ButtonAppearance;
  /**
   * Expands the button to 100% of available space.
   */
  block: boolean;
  /**
   * Controls whether to display the loading indicator for this component.
   */
  loading: boolean;
  /**
   * Turns the ripple effect on or off.
   */
  ripple: boolean;
  /**
   * Hides/shows a loading indicator instead of the button content.
   */
  state: boolean;
};

export type ButtonSettings = Partial<EntireButtonSettings>;
