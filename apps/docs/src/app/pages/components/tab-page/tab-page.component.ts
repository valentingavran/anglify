import { Component } from '@angular/core';
import { APIConfig, ComponentPageModule } from '../../../app.interface';

@Component({
  selector: 'anglify-tab-page',
  templateUrl: './tab-page.component.html',
  styleUrls: ['./tab-page.component.scss'],
  standalone: true,
  imports: ComponentPageModule,
})
export class TabPageComponent {
  public config: APIConfig = {
    components: ['TabComponent'],
  };
}
