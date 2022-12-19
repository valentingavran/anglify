import type { InputAppearance } from '@anglify/components';
import {
  ExpansionPanelComponent,
  ExpansionPanelsComponent,
  CheckboxComponent,
  InputDirective,
  RadioButtonComponent,
  SelectComponent,
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
    SelectComponent,
    TextFieldComponent,
    CheckboxComponent,
    RadioButtonComponent,
    InputDirective,
    FormsModule,
    SlotDirective,
    ExpansionPanelsComponent,
    ExpansionPanelComponent,
  ],
  templateUrl: './select-playground.component.html',
  styleUrls: ['./select-playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectPlaygroundComponent {
  protected value = null;

  protected appearance: InputAppearance = 'outlined';

  protected label = 'Best movie';

  protected placeholder = 'Placeholder';

  protected hint = 'Hint';

  protected readonly = false;

  protected disabled = false;

  protected clearable = false;

  protected multiple = false;

  protected closeOnSelect = true;

  protected alwaysFloatingLabel = false;

  protected persistentHint = false;

  protected hideDetails = false;

  protected dense = false;

  protected flip = false;

  protected readonly items = top10Movies;
}
