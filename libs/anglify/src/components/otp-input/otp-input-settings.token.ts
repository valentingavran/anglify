import { InjectionToken } from '@angular/core';
import { EntireOTPInputSettings, OTPInputSettings } from './otp-input.interface';

export const DEFAULT_OTP_INPUT_SETTINGS: EntireOTPInputSettings = {
  disabled: false,
  readonly: false,
  hiddenInput: false,
  length: 6,
};

export const OTP_INPUT_SETTINGS = new InjectionToken<OTPInputSettings>('OTP Input Settings');
