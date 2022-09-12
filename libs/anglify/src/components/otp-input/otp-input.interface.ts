export type EntireOTPInputSettings = {
  disabled: boolean;
  hiddenInput: boolean;
  length: number;
  readonly: boolean;
};

export type OTPInputSettings = Partial<EntireOTPInputSettings>;
