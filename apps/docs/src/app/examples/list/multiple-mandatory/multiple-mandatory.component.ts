import {
  ListComponent,
  ListItemGroupComponent,
  ListItemComponent,
  ListItemTitleComponent,
  IconComponent,
  SlotDirective,
} from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './multiple-mandatory.component.html',
  styleUrls: ['./multiple-mandatory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ListComponent, ListItemGroupComponent, ListItemComponent, ListItemTitleComponent, IconComponent, SlotDirective],
})
export default class MultipleMandatoryComponent {}
