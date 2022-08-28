export type ChipAppearance = 'filled' | 'outlined';

export interface EntireChipSettings {
  appearance: ChipAppearance;
  filter: boolean;
  ripple: boolean;
}

export type ChipSettings = Partial<EntireChipSettings>;
