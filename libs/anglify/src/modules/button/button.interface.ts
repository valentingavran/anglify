export type ButtonAppearance = 'contained' | 'contained-tonal' | 'outlined' | 'text' | 'icon' | 'fab' | 'extended-fab';

export interface ButtonSettings {
  appearance?: ButtonAppearance;
  block?: boolean;
  ripple?: boolean;
  state?: boolean;
}
