import type { Position } from '../../composables/position/position.interface';

export type EntireBadgeSettings = {
  /**
   * Applies a border around the badge.
   */
  border: boolean;
  /**
   * Any content you want injected as text into the badge.
   */
  content: string | undefined;
  /**
   * Offset the badge on the x-axis.
   */
  horizontalOffset: number;
  /**
   * Defines at which position the badge should be displayed.
   */
  position: Position;
  /**
   * Controls whether the component is visible or hidden.
   */
  value: boolean;
  /**
   * Offset the badge on the y-axis.
   */
  verticalOffset: number;
};

export type BadgeSettings = Partial<EntireBadgeSettings>;
