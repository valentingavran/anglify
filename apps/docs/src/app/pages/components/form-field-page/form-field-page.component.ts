import { FormFieldType } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-form-field-page',
  templateUrl: './form-field-page.component.html',
  styleUrls: ['./form-field-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldPageComponent {
  public type: FormFieldType = 'filled';
  public label = 'Label';
  public placeholder = 'Placeholder';
  public hint = 'Hint';
  public readonly = false;
  public disabled = false;
  public persistentPlaceholder = false;
  public persistentHint = false;
  public prependIcon = false;
  public prependOuterIcon = false;
  public appendIcon = false;
  public appendOuterIcon = false;
  public hideDetails = false;
}
