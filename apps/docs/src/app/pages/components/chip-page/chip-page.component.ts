import { Component } from '@angular/core';
import { APIConfig, ComponentPageModule } from '../../../app.interface';

@Component({
  selector: 'anglify-chip-page',
  templateUrl: './chip-page.component.html',
  styleUrls: ['./chip-page.component.scss'],
  standalone: true,
  imports: ComponentPageModule,
})
export class ChipPageComponent {
  public config: APIConfig = {
    components: ['ChipComponent'],
  };
}
