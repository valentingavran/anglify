import { ButtonComponent, IconComponent, SlotDirective, ToolbarComponent } from '@anglify/components';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ToolbarComponent, ButtonComponent, IconComponent, SlotDirective],
})
export default class CollapseComponent {}
