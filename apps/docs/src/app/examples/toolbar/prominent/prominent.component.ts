import { ButtonComponent, IconComponent, SlotDirective, ToolbarComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './prominent.component.html',
  styleUrls: ['./prominent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ToolbarComponent, ButtonComponent, IconComponent, SlotDirective],
})
export default class ProminentComponent {}
