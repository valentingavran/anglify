import { AbstractControl, ValidationErrors } from '@angular/forms';

export class Validators {
  public static required(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return {
        message: 'This field is required',
      };
    }
    return null;
  }

  public static password(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    if (new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).test(value)) {
      return null;
    }
    return {
      message: 'Password must be at least eight characters long and contain at least one letter, one number and one special character',
    };
  }

  public static email(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value;
    if (new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(value)) {
      return null;
    }
    return {
      message: 'Please provide a valid email address',
    };
  }
}
