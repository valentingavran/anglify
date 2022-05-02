import { ComponentSize } from '../../utils/interfaces';

export type ButtonAppearance = 'elevated' | 'filled' | 'filled-tonal' | 'outlined' | 'text' | 'icon' | 'fab' | 'extended-fab';

export interface ButtonSettings {
  appearance?: ButtonAppearance;
  block?: boolean;
  ripple?: boolean;
  size?: ComponentSize;
  state?: boolean;
}
