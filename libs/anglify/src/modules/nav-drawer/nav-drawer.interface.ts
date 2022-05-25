export type DrawerMode = 'standard' | 'modal';

export interface EntireNavDrawerSettings {
  mode: DrawerMode;
  fixed: boolean;
  closeOnOutsideClick: boolean;
  closeOnItemClick: boolean;
}

export type NavDrawerSettings = Partial<EntireNavDrawerSettings>;
