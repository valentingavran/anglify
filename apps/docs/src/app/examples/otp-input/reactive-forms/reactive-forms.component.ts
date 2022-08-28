import { OtpInputComponent, Validators } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OtpInputComponent, ReactiveFormsModule],
})
export default class ReactiveFormsComponent {
  public control = new FormControl(null, [Validators.minLength(6)]);
}
