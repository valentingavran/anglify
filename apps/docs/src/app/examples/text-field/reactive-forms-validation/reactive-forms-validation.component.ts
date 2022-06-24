import { Validators } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reactive-forms-validation',
  templateUrl: './reactive-forms-validation.component.html',
  styleUrls: ['./reactive-forms-validation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReactiveFormsValidationComponent {
  public emailControl = new FormControl('', [Validators.email, Validators.required]);
  public passwordControl = new FormControl('', [Validators.password, Validators.required]);
}

export default ReactiveFormsValidationComponent;
