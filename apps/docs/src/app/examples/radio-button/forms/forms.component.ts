import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormsComponent {
  public inputOne = true;
  public inputTwo = new FormControl(true);
  public form: FormGroup;

  public constructor(private readonly formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      myFormControl: true,
    });
  }
}

export default FormsComponent;
