import { ToolbarComponent, ButtonComponent, IconComponent, SlotDirective } from '@anglify/components';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './regular.component.html',
  styleUrls: ['./regular.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ToolbarComponent, ButtonComponent, IconComponent, SlotDirective],
})
export default class RegularComponent {}
