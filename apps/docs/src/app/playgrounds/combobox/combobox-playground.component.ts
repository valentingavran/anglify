import type { InputAppearance } from '@anglify/components';
import {
  CheckboxComponent,
  ComboboxComponent,
  ExpansionPanelComponent,
  ExpansionPanelsComponent,
  InputDirective,
  RadioButtonComponent,
  SlotDirective,
  TextFieldComponent,
} from '@anglify/components';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { top10Movies } from '../../examples/examples';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ComboboxComponent,
    SlotDirective,
    FormsModule,
    CheckboxComponent,
    RadioButtonComponent,
    InputDirective,
    TextFieldComponent,
    ExpansionPanelsComponent,
    ExpansionPanelComponent,
  ],
  templateUrl: './combobox-playground.component.html',
  styleUrls: ['./combobox-playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComboboxPlaygroundComponent {
  protected value = null;

  protected appearance: InputAppearance = 'outlined';

  protected label = 'Best movie';

  protected placeholder = 'Placeholder';

  protected hint = 'Hint';

  protected itemTextKey = 'label';

  protected itemValueKey = undefined;

  protected disabled = false;

  protected clearable = false;

  protected multiple = false;

  protected alwaysFloatingLabel = false;

  protected persistentHint = false;

  protected hideDetails = false;

  protected dense = false;

  protected flip = false;

  protected readonly items = top10Movies;
}
