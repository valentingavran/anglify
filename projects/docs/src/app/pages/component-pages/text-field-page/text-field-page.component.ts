import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TextFieldType } from '../../../../../../anglify/src/modules/text-field/text-field.interface';
import { FormControl } from '@angular/forms';
import { Validators } from '../../../helpers/validators';

@Component({
  selector: 'app-text-field-page',
  templateUrl: './text-field-page.component.html',
  styleUrls: ['./text-field-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldPageComponent {
  public type: TextFieldType = 'filled';
  public label = 'Label';
  public placeholder = 'Placeholder';
  public hint = 'Hint';
  public readonly = true;
  public disabled = false;
  public persistentPlaceholder = false;
  public persistentHint = false;
  public prependIcon = false;
  public prependOuterIcon = false;
  public appendIcon = false;
  public appendOuterIcon = false;

  public emailControl = new FormControl('', [Validators.email, Validators.required]);
  public passwordControl = new FormControl('', [Validators.password, Validators.required]);

  public passwordControl2 = new FormControl('password', [Validators.required]);

  public submit(): void {
    if (this.passwordControl2.value !== '12345678') {
      setTimeout(() => {
        this.passwordControl2.setErrors({ message: 'Password is not 12345678' });
      }, 2000);
    }
  }
}
