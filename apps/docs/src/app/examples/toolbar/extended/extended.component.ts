import { ToolbarComponent, ButtonComponent, IconComponent, TabGroupComponent, TabComponent, SlotDirective } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './extended.component.html',
  styleUrls: ['./extended.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ToolbarComponent, ButtonComponent, IconComponent, TabGroupComponent, TabComponent, SlotDirective],
})
export default class ExtendedComponent {
  protected activeTab = 0;
}
