import { BooleanLike } from '../../utils/interfaces';

export interface EntireBottomNavigationSettings {
  shift: BooleanLike;
  grow: BooleanLike;
}

export type BottomNavigationSettings = Partial<EntireBottomNavigationSettings>;
