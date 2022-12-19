export type EntireTimelineSettings = {
  /**
   * Hide opposite slot content, and position all items to one side of timeline.
   */
  dense: boolean;
  /**
   * Reverse direction of timeline items.
   */
  reverse: boolean;
};

export type TimelineSettings = Partial<EntireTimelineSettings>;
