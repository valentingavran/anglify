import { Component } from '@angular/core';
import { APIConfig } from '../../../app.interface';

@Component({
  selector: 'anglify-tab-page',
  templateUrl: './tab-page.component.html',
  styleUrls: ['./tab-page.component.scss'],
})
export class TabPageComponent {
  public config: APIConfig = {
    components: ['TabComponent'],
  };
}
