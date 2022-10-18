import { ButtonComponent, ListItemComponent, ListItemTitleComponent, MenuComponent, SlotDirective } from '@anglify/components';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [MenuComponent, ButtonComponent, SlotDirective, ListItemComponent, ListItemTitleComponent, NgTemplateOutlet],
  templateUrl: './flip.component.html',
  styleUrls: ['./flip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FlipComponent {}
