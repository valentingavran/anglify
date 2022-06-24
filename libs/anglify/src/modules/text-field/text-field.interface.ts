import { InputAppearance } from '../input/input.interface';

export interface EntireTextFieldSettings {
  appearance: InputAppearance;
  dense: boolean;
  persistentHint: boolean;
  alwaysFloatingLabel: boolean;
  hideDetails: boolean;
  counter: boolean;
}

export type TextFieldSettings = Partial<EntireTextFieldSettings>;
