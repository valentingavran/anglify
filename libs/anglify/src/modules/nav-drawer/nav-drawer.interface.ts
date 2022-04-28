import type { BooleanLike } from '../../utils/interfaces';

export interface NavDrawerSettings {
  mode?: DrawerMode;
  fixed?: BooleanLike;
  closeOnOutsideClick?: BooleanLike;
  closeOnItemClick?: BooleanLike;
}

export type DrawerMode = 'standard' | 'modal';
