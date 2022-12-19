export type EntireSimpleTableSettings = {
  /**
   * Displays the footer while scrolling and not only at the very bottom.
   */
  fixedFooter: boolean;
  /**
   * Displays the header while scrolling and not only at the very top.
   */
  fixedHeader: boolean;
  /**
   * Sets the height for the component.
   */
  fixedHeight: string | null;
};

export type SimpleTableSettings = Partial<EntireSimpleTableSettings>;
