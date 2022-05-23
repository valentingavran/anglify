
export interface EntireProgressLinearSettings {
  active: boolean;
  bufferValue: number;
  indeterminate: boolean;
  stream: boolean;
  value: number;
}

export type ProgressLinearSettings = Partial<EntireProgressLinearSettings>;
