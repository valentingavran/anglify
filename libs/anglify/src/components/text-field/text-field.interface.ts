import type { InputAppearance } from '../input/input.interface';

export type EntireTextFieldSettings = {
  alwaysFloatingLabel: boolean;
  appearance: InputAppearance;
  counter: boolean;
  dense: boolean;
  hideDetails: boolean;
  persistentHint: boolean;
};

export type TextFieldSettings = Partial<EntireTextFieldSettings>;
