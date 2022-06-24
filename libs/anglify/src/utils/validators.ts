import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class Validators {
  /**
   * Checks that the value of the FormControl is not one of the following: `null`, `undefined`,
   * `""` (an empty string) or `false`.
   */
  public static required(control: AbstractControl): ValidationErrors | null {
    const value = control.value as unknown;
    if (value === null || value === undefined || value === '' || value === false) {
      return {
        message: 'Required',
      };
    }
    return null;
  }

  public static email(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(value)) {
      return null;
    }
    return {
      message: 'Invalid email',
    };
  }

  /**
   * Validator that requires the length of the control's value to be greater than or equal
   * to the provided minimum length. Note that the `minLength` validator is intended to be used
   * only for types that have a numeric `length` property, such as strings or arrays.
   */
  public static minLength(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string | null;
      if (value === null || value.length < min) {
        return {
          message: `Must be at least ${min} characters long`,
        };
      }
      return null;
    };
  }

  /**
   * Validator that requires the length of the control's value to be less than or equal
   * to the provided maximum length. Note that the `maxLength` validator is intended to be used
   * only for types that have a numeric `length` property, such as strings or arrays.
   */
  public static maxLength(max: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string | null;
      if (value === null || value.length > max) {
        return {
          message: `Maximum ${max} characters allowed`,
        };
      }
      return null;
    };
  }

  public static matchPassword = (fieldAName: string, fieldBName: string) => (AC: AbstractControl) => {
    const controlA = AC.get(fieldAName);
    const controlB = AC.get(fieldBName);
    if (!controlA || !controlB) {
      return null;
    }

    const valueA = controlA.value as string;
    const valueB = controlB.value as string;
    if (valueA && valueB) {
      if (valueA !== valueB || !valueA.length || !valueB.length) {
        controlB.markAsDirty();
        controlB.setErrors({ message: 'Passwords do not match' });
        return {
          message: 'Passwords do not match',
        };
      }
    }
    return null;
  };

  /**
   * Validator that checks if the value has at least eight characters and contains at least one
   * letter, one number and one special character
   */
  public static password(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).test(value)) {
      return null;
    }
    return {
      message: 'Password must be at least eight characters long and contain at least one letter, one number and one special character',
    };
  }
}
