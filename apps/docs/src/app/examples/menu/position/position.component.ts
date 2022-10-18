import { ButtonComponent, ListItemComponent, ListItemTitleComponent, MenuComponent, SlotDirective } from '@anglify/components';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MenuComponent, ButtonComponent, SlotDirective, ListItemComponent, ListItemTitleComponent, NgTemplateOutlet],
})
export default class PositionComponent {}
