export type NavigationDrawerMode = 'standard' | 'modal';

export interface EntireNavigationDrawerSettings {
  mode: NavigationDrawerMode;
  closeOnOutsideClick: boolean;
  closeOnItemClick: boolean;
}

export type NavigationDrawerSettings = Partial<EntireNavigationDrawerSettings>;
