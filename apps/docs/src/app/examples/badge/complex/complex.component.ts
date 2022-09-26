import { BadgeComponent, ButtonComponent, IconComponent, SlotDirective, ToolbarComponent } from '@anglify/components';
import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './complex.component.html',
  styleUrls: ['./complex.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ToolbarComponent, BadgeComponent, IconComponent, ButtonComponent, SlotDirective, NgTemplateOutlet],
})
export default class ComplexComponent {}
