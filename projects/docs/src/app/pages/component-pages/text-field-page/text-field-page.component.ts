import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TextFieldType } from '../../../../../../anglify/src/modules/text-field/text-field.interface';

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
}
