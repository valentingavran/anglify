export type ChipAppearance = 'filled' | 'outlined';

export type EntireChipSettings = {
  appearance: ChipAppearance;
  filter: boolean;
  ripple: boolean;
};

export type ChipSettings = Partial<EntireChipSettings>;
