export type EntireOTPInputSettings = {
  /**
   * Disable the input.
   */
  disabled: boolean;
  /**
   * Displays points instead of the actual values.
   */
  hiddenInput: boolean;
  /**
   * The OTP field’s length,
   */
  length: number;
  /**
   * Puts input in readonly state.
   */
  readonly: boolean;
};

export type OTPInputSettings = Partial<EntireOTPInputSettings>;
