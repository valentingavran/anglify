import { Component, ChangeDetectionStrategy } from '@angular/core';
import { APIConfig } from '../../../app.interface';

@Component({
  selector: 'anglify-expansion-panels-page',
  templateUrl: './expansion-panels-page.component.html',
  styleUrls: ['./expansion-panels-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpansionPanelsPageComponent {
  public config: APIConfig = {
    components: ['ExpansionPanelComponent', 'ExpansionPanelsComponent'],
  };
}
