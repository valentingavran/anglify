import type { Position } from '../../composables/position/position.interface';

export type EntireBadgeSettings = {
  border: boolean;
  position: Position;
};

export type BadgeSettings = Partial<EntireBadgeSettings>;
