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
  templateUrl: './inset.component.html',
  styleUrls: ['./inset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InsetComponent {}
