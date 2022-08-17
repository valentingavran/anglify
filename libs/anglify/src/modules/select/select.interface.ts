import { Position } from '../../composables/position/position.interface';
import { InputAppearance } from '../input/input.interface';

export interface SelectItem {
  text: string;
  value: any;
  disabled?: boolean;
}

export interface EntireSelectSettings {
  appearance: InputAppearance;
  alwaysFloatingLabel: false;
  persistentHint: false;
  dropdownPosition: Position;
  dropdownAutoPosition: boolean;
  dropdownOffset: number;
  clearable: boolean;
  closeOnSelect: boolean;
  noOptions: string;
  addItem: string;
}

export type SelectSettings = Partial<EntireSelectSettings>;
