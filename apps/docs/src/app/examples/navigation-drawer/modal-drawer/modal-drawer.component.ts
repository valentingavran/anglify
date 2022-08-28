import {
  ButtonComponent,
  CardComponent,
  IconComponent,
  ListComponent,
  ListItemComponent,
  ListItemTitleComponent,
  NavigationDrawerComponent,
  SlotDirective,
} from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './modal-drawer.component.html',
  styleUrls: ['./modal-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ButtonComponent,
    CardComponent,
    NavigationDrawerComponent,
    ListComponent,
    ListItemComponent,
    IconComponent,
    ListItemTitleComponent,
    SlotDirective,
  ],
})
export default class ModalDrawerComponent {}
