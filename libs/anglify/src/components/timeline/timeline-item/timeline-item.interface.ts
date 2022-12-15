export type TimelineItemAlignment = 'end' | 'none' | 'start';

export type EntireTimelineItemSettings = {
  /**
   * Sets the item alignment/orientation.
   */
  alignment: TimelineItemAlignment;
  /**
   * Removes the line below the indicator.
   */
  bottomConnectionLineVisible: boolean;
  /**
   * Hides the other side of the item content. Should only be used by the `anglify-timeline`
   * component in conjunction with the dense property.
   */
  hideOpposite: boolean;
  /**
   * Removes the line above the indicator.
   */
  topConnectionLineVisible: boolean;
};

export type TimelineItemSettings = Partial<EntireTimelineItemSettings>;
