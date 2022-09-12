export type ButtonAppearance = 'contained' | 'extended-fab' | 'fab' | 'icon' | 'outlined' | 'text';

export type EntireButtonSettings = {
  appearance: ButtonAppearance;
  block: boolean;
  ripple: boolean;
  state: boolean;
};

export type ButtonSettings = Partial<EntireButtonSettings>;
