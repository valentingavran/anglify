import type { Position } from '../../composables/position/position.interface';

export type EntireBadgeSettings = {
  border: boolean;
  horizontalOffset: number;
  position: Position;
  verticalOffset: number;
};

export type BadgeSettings = Partial<EntireBadgeSettings>;
