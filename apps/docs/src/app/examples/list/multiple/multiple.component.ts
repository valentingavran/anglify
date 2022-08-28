import {
  IconComponent,
  ListComponent,
  ListItemComponent,
  ListItemGroupComponent,
  ListItemTitleComponent,
  SlotDirective,
} from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ListComponent, ListItemGroupComponent, ListItemComponent, ListItemTitleComponent, IconComponent, SlotDirective],
})
export default class MultipleComponent {}
