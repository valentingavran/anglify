import type { InputAppearance } from '@anglify/components';
import {
  CheckboxComponent,
  IconComponent,
  InputDirective,
  RadioButtonComponent,
  SlotDirective,
  TextFieldComponent,
} from '@anglify/components';
import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [TextFieldComponent, InputDirective, CheckboxComponent, SlotDirective, RadioButtonComponent, FormsModule, IconComponent, NgIf],
  templateUrl: './text-field-playground.component.html',
  styleUrls: ['./text-field-playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldPlaygroundComponent {
  protected appearance: InputAppearance = 'outlined';

  protected label = 'Label';

  protected placeholder = 'Placeholder';

  protected hint = 'Hint';

  protected readonly = false;

  protected disabled = false;

  protected alwaysFloatingLabel = false;

  protected persistentHint = false;

  protected prependIcon = false;

  protected prependOuterIcon = false;

  protected appendIcon = false;

  protected appendOuterIcon = false;

  protected dense = false;

  protected hideDetails = false;
}
