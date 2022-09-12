import { InputDirective, TextFieldComponent, Validators } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  templateUrl: './reactive-forms-validation.component.html',
  styleUrls: ['./reactive-forms-validation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextFieldComponent, ReactiveFormsModule, InputDirective],
})
export default class ReactiveFormsValidationComponent {
  public emailControl = new FormControl<string | null>(null, [Validators.email, Validators.required]);

  public passwordControl = new FormControl<string | null>(null, [Validators.password, Validators.required]);
}
