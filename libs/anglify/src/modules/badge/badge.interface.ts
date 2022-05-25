import { Position } from '../../composables/position/position.interface';
import { BooleanLike } from '../../utils/interfaces';

export interface EntireBadgeSettings {
  border: BooleanLike;
  position: Position;
}

export type BadgeSettings = Partial<EntireBadgeSettings>;
