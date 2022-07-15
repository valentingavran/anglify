import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig } from '../../../app.interface';

@Component({
  selector: 'app-text-field-page',
  templateUrl: './text-field-page.component.html',
  styleUrls: ['./text-field-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldPageComponent {
  public config: APIConfig = {
    components: ['TextFieldComponent'],
  };

  public appearance: 'filled' | 'outlined' = 'filled';
  public label = 'Label';
  public placeholder = 'Placeholder';
  public hint = 'Hint';
  public readonly = false;
  public disabled = false;
  public alwaysFloatingLabel = false;
  public persistentHint = false;
  public prependIcon = false;
  public prependOuterIcon = false;
  public appendIcon = false;
  public appendOuterIcon = false;
  public hideDetails = false;
}
