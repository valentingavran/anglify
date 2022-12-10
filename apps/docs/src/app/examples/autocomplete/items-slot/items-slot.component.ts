import {
  AutocompleteComponent,
  CheckboxComponent,
  ListItemComponent,
  ListItemDescriptionComponent,
  ListItemTitleComponent,
  SlotDirective,
} from '@anglify/components';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { top10Movies } from '../../examples';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    AutocompleteComponent,
    SlotDirective,
    ListItemComponent,
    ListItemTitleComponent,
    ListItemDescriptionComponent,
    CheckboxComponent,
  ],
  templateUrl: './items-slot.component.html',
  styleUrls: ['./items-slot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ItemsSlotComponent {
  protected top10Movies = top10Movies;
}
