import { InputAppearance } from '../input/input.interface';

export interface EntireTextAreaSettings {
  appearance: InputAppearance;
  dense: boolean;
  persistentHint: boolean;
  alwaysFloatingLabel: boolean;
  hideDetails: boolean;
  counter: boolean;
}

export type TextAreaSettings = Partial<EntireTextAreaSettings>;
