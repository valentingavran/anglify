import { Component } from '@angular/core';
import { APIConfig } from '../../../app.interface';

@Component({
  selector: 'anglify-chip-page',
  templateUrl: './chip-page.component.html',
  styleUrls: ['./chip-page.component.scss'],
})
export class ChipPageComponent {
  public config: APIConfig = {
    components: ['ChipComponent'],
  };
}
