import { ButtonComponent, InputDirective, TextFieldComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  standalone: true,
  templateUrl: './server-error-handling.component.html',
  styleUrls: ['./server-error-handling.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextFieldComponent, ReactiveFormsModule, InputDirective, ButtonComponent],
})
export default class ServerErrorHandlingComponent {
  public passwordControl = new FormControl('password', [Validators.required]);

  public submit() {
    // Simulate server response with this delay
    setTimeout(() => {
      if (this.passwordControl.value !== '12345678') {
        this.passwordControl.markAsDirty();
        this.passwordControl.setErrors({ message: 'Password is not 12345678' });
      }
    }, 2_000);
  }
}
