import { Validators } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'anglify-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormsComponent {
  public control = new FormControl(null, [Validators.minLength(6)]);
}
export default ReactiveFormsComponent;
