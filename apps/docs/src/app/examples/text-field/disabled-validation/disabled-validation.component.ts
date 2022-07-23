import { Validators } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-disabled-validation',
  templateUrl: './disabled-validation.component.html',
  styleUrls: ['./disabled-validation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledValidationComponent {
  public form = new FormGroup({
    email: new FormControl<string | null>(null, [Validators.email, Validators.required]),
    password: new FormControl<string | null>(null, [Validators.password, Validators.required]),
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
