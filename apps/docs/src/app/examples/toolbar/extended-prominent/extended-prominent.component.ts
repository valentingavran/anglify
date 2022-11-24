import { ButtonComponent, IconComponent, SlotDirective, TabComponent, TabGroupComponent, ToolbarComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './extended-prominent.component.html',
  styleUrls: ['./extended-prominent.component.scss'],
  imports: [ToolbarComponent, ButtonComponent, IconComponent, TabGroupComponent, TabComponent, SlotDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ExtendedProminentComponent {
  public activeTab = 1;
}
