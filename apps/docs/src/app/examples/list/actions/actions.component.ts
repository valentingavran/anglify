import {
  CardComponent,
  CheckboxComponent,
  ListComponent,
  ListItemComponent,
  ListItemDescriptionComponent,
  ListItemGroupComponent,
  ListItemTitleComponent,
  SlotDirective,
} from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CardComponent,
    ListComponent,
    ListItemGroupComponent,
    ListItemComponent,
    CheckboxComponent,
    ListItemTitleComponent,
    ListItemDescriptionComponent,
    SlotDirective,
  ],
})
export default class ActionsComponent {}
