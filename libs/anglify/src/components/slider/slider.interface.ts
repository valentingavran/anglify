export type EntireSliderSettings = {
  disabled: boolean;
  max: number;
  min: number;
  ripple: boolean;
  state: boolean;
  step: number;
  ticks: boolean;
  tooltip: boolean;
  value: number;
};

export type SliderSettings = Partial<EntireSliderSettings>;
