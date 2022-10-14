import { ButtonComponent, DividerComponent, IconComponent, SlotDirective, ToolbarComponent } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule, DividerComponent, ToolbarComponent, IconComponent, ButtonComponent, SlotDirective],
  templateUrl: './vertical.component.html',
  styleUrls: ['./vertical.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class VerticalComponent {}
