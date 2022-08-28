import {
  ListComponent,
  ListItemComponent,
  ListItemTitleComponent,
  ListGroupComponent as AnglifyListGroupComponent,
  IconComponent,
  ListItemGroupComponent,
  SlotDirective,
} from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ListComponent,
    AnglifyListGroupComponent,
    ListItemComponent,
    ListItemTitleComponent,
    IconComponent,
    ListItemGroupComponent,
    SlotDirective,
  ],
})
export default class ListGroupComponent {}
