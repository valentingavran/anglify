import type { InputAppearance } from '../input/input.interface';

export type EntireTextAreaSettings = {
  alwaysFloatingLabel: boolean;
  appearance: InputAppearance;
  counter: boolean;
  dense: boolean;
  hideDetails: boolean;
  persistentHint: boolean;
};

export type TextAreaSettings = Partial<EntireTextAreaSettings>;
