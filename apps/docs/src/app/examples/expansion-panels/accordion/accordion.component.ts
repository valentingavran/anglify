import { ExpansionPanelComponent, ExpansionPanelsComponent } from '@anglify/components';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ExpansionPanelsComponent, ExpansionPanelComponent],
})
export default class AccordionComponent {}
