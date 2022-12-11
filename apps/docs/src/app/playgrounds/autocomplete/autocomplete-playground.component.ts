import type { InputAppearance } from '@anglify/components';
import {
  ExpansionPanelComponent,
  ExpansionPanelsComponent,
  AutocompleteComponent,
  CheckboxComponent,
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
    AutocompleteComponent,
    SlotDirective,
    FormsModule,
    CheckboxComponent,
    RadioButtonComponent,
    InputDirective,
    TextFieldComponent,
    ExpansionPanelsComponent,
    ExpansionPanelComponent,
  ],
  templateUrl: './autocomplete-playground.component.html',
  styleUrls: ['./autocomplete-playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompletePlaygroundComponent {
  protected value: any[] = [];

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

  protected readonly items = top10Movies;
}
