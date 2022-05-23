export type ButtonAppearance = 'contained' | 'contained-tonal' | 'outlined' | 'text' | 'icon' | 'fab' | 'extended-fab';

export interface EntireButtonSettings {
  appearance: ButtonAppearance;
  block: boolean;
  ripple: boolean;
  state: boolean;
}

export type ButtonSettings = Partial<EntireButtonSettings>;
