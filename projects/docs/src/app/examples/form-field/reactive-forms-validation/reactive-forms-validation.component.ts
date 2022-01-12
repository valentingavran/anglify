import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms-validation',
  templateUrl: './reactive-forms-validation.component.html',
  styleUrls: ['./reactive-forms-validation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormsValidationComponent {
  public emailControl = new FormControl('', [Validators.email, Validators.required]);
  public passwordControl = new FormControl('', [Validators.password, Validators.required]);
}

class Validators {
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

export default ReactiveFormsValidationComponent;
