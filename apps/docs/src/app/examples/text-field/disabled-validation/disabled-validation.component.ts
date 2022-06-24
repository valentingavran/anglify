import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors } from '@angular/forms';

class Validators {
  public static required(control: AbstractControl): ValidationErrors | null {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const value = control.value;
    if (value === null || value === undefined || value === '') {
      return {
        message: 'This field is required',
      };
    }
    return null;
  }

  public static password(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/).test(value)) {
      return null;
    }
    return {
      message: 'Password must be at least eight characters long and contain at least one letter, one number and one special character',
    };
  }

  public static email(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;
    if (new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(value)) {
      return null;
    }
    return {
      message: 'Please provide a valid email address',
    };
  }
}

@Component({
  selector: 'app-disabled-validation',
  templateUrl: './disabled-validation.component.html',
  styleUrls: ['./disabled-validation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledValidationComponent {
  public form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.password, Validators.required]),
  });

  public disableEmailField() {
    if (this.form.get('email')?.disabled) {
      this.form.get('email')?.enable();
    } else {
      this.form.get('email')?.disable();
    }
  }

  public manualError() {
    const control = this.form.get('email');
    control?.markAsDirty();
    control?.setErrors({ message: 'This email already exists' });
  }
}

export default DisabledValidationComponent;
