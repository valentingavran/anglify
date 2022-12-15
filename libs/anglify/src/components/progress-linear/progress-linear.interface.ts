export type EntireProgressLinearSettings = {
  /**
   * Defines whether the component is currently being animated.
   */
  active: boolean;
  /**
   * The percentage value for the buffer.
   */
  bufferValue: number;
  /**
   * Constantly animates, use when loading progress is unknown.
   */
  indeterminate: boolean;
  /**
   * An alternative style for portraying loading that works in tandem with buffer-value.
   */
  stream: boolean;
  /**
   * The percentage value for current progress.
   */
  value: number;
};

export type ProgressLinearSettings = Partial<EntireProgressLinearSettings>;
