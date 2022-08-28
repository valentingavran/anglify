import { IconComponent, SlotDirective, TabComponent, TabGroupComponent } from '@anglify/components';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './icon-only.component.html',
  styleUrls: ['./icon-only.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TabGroupComponent, TabComponent, IconComponent, SlotDirective],
})
export default class IconOnlyComponent {}
