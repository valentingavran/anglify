import {
  CheckboxComponent,
  IconComponent,
  InputDirective,
  RadioButtonComponent,
  SlotDirective,
  TextFieldComponent,
} from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [TextFieldComponent, InputDirective, CheckboxComponent, SlotDirective, RadioButtonComponent, FormsModule, IconComponent],
  templateUrl: './text-field-playground.component.html',
  styleUrls: ['./text-field-playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldPlaygroundComponent {
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
