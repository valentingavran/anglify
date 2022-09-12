import type { Position } from '../../composables/position/position.interface';
import type { InputAppearance } from '../input/input.interface';

export type SelectItem = {
  disabled?: boolean;
  text: string;
  value: any;
};

export type EntireSelectSettings = {
  addItem: string;
  alwaysFloatingLabel: false;
  appearance: InputAppearance;
  clearable: boolean;
  closeOnSelect: boolean;
  dropdownAutoPosition: boolean;
  dropdownOffset: number;
  dropdownPosition: Position;
  noDataText: string;
  persistentHint: false;
};

export type SelectSettings = Partial<EntireSelectSettings>;
