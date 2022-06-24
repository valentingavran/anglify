import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-server-error-handling',
  templateUrl: './server-error-handling.component.html',
  styleUrls: ['./server-error-handling.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerErrorHandlingComponent {
  public passwordControl = new FormControl('password', [Validators.required]);

  public submit() {
    // Simulate server response with this delay
    setTimeout(() => {
      if (this.passwordControl.value !== '12345678') {
        this.passwordControl.markAsDirty();
        this.passwordControl.setErrors({ message: 'Password is not 12345678' });
      }
    }, 2000);
  }
}

export default ServerErrorHandlingComponent;
