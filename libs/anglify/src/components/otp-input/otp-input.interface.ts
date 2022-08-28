export interface EntireOTPInputSettings {
  disabled: boolean;
  readonly: boolean;
  hiddenInput: boolean;
  length: number;
}

export type OTPInputSettings = Partial<EntireOTPInputSettings>;
