import type { Position } from '@anglify/components';
import {
  ButtonComponent,
  CheckboxComponent,
  InputDirective,
  ListItemComponent,
  ListItemTitleComponent,
  MenuComponent,
  SelectComponent,
  SlotDirective,
  TextFieldComponent,
} from '@anglify/components';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    CheckboxComponent,
    FormsModule,
    MenuComponent,
    ListItemComponent,
    ListItemTitleComponent,
    SlotDirective,
    ButtonComponent,
    SelectComponent,
    TextFieldComponent,
    InputDirective,
  ],
  templateUrl: './menu-playground.component.html',
  styleUrls: ['./menu-playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuPlaygroundComponent {
  protected positions = [
    'bottom-start',
    'bottom',
    'bottom-end',
    'top-start',
    'top',
    'top-end',
    'left-start',
    'left',
    'left-end',
    'right-start',
    'right',
    'right-end',
  ];

  protected position: Position = 'bottom';

  protected offset = 0;

  protected setOffset(value: string) {
    this.offset = Number(value);
  }

  protected closeOnEscape = true;

  protected closeOnMenuClick = true;

  protected closeOnOutsideClick = true;

  protected disabledMenu = false;

  protected flip = false;

  protected shift = false;

  protected focusActivatorOnClose = true;
}
