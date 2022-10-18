import {
  DividerComponent,
  IconComponent,
  ListComponent,
  ListItemComponent,
  ListItemGroupComponent,
  ListItemTitleComponent,
  SlotDirective,
} from '@anglify/components';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    DividerComponent,
    IconComponent,
    ListComponent,
    ListItemComponent,
    ListItemGroupComponent,
    ListItemTitleComponent,
    SlotDirective,
  ],
  templateUrl: './horizontal.component.html',
  styleUrls: ['./horizontal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HorizontalComponent {}
