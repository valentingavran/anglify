import { ExpansionPanelComponent, ExpansionPanelsComponent } from '@anglify/components';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExpansionPanelsComponent, ExpansionPanelComponent],
})
export default class MultipleComponent {
  protected value = [0, 1];
}
