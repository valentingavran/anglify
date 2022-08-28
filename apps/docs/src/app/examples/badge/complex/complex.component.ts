import { BadgeDirective, ButtonComponent, IconComponent, SlotDirective, ToolbarComponent } from '@anglify/components';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './complex.component.html',
  styleUrls: ['./complex.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ToolbarComponent, BadgeDirective, IconComponent, ButtonComponent, SlotDirective],
})
export default class ComplexComponent {}
