export type NavigationDrawerMode = 'modal' | 'standard';

export type EntireNavigationDrawerSettings = {
  closeOnItemClick: boolean;
  closeOnOutsideClick: boolean;
  mode: NavigationDrawerMode;
};

export type NavigationDrawerSettings = Partial<EntireNavigationDrawerSettings>;
