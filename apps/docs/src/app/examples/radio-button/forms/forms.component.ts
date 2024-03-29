import { RadioButtonComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, type FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RadioButtonComponent, ReactiveFormsModule],
})
export default class FormsComponent {
  public inputOne = true;

  public inputTwo = new FormControl(true);

  public form: FormGroup;

  public constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      myFormControl: true,
    });
  }
}
