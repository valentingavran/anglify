import { CheckboxComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, type FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CheckboxComponent, FormsModule, ReactiveFormsModule],
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
