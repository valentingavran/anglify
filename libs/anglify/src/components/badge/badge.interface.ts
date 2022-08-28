import { Position } from '../../composables/position/position.interface';

export interface EntireBadgeSettings {
  border: boolean;
  position: Position;
}

export type BadgeSettings = Partial<EntireBadgeSettings>;
