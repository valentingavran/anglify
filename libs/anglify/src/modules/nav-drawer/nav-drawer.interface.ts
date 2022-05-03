export interface NavDrawerSettings {
  mode?: DrawerMode;
  fixed?: boolean;
  closeOnOutsideClick?: boolean;
  closeOnItemClick?: boolean;
}

export type DrawerMode = 'standard' | 'modal';
