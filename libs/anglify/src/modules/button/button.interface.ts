export type ButtonAppearance = 'elevated' | 'filled' | 'filled-tonal' | 'outlined' | 'text' | 'icon' | 'fab' | 'extended-fab';

export interface ButtonSettings {
  ripple?: boolean;
  appearance?: ButtonAppearance;
}
