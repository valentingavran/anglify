export type EntireProgressCircularSettings = {
  /**
   * Constantly animates, use when loading progress is unknown.
   */
  indeterminate: boolean;
  /**
   * The amount in degrees that the component should be rotated.
   */
  rotation: number;
  /**
   * The percentage value for current progress.
   */
  value: number;
};

export type ProgressCircularSettings = Partial<EntireProgressCircularSettings>;
