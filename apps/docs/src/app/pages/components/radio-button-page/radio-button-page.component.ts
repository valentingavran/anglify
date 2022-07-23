import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig } from '../../../app.interface';

@Component({
  selector: 'anglify-radio-button-page',
  templateUrl: './radio-button-page.component.html',
  styleUrls: ['./radio-button-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonPageComponent {
  public config: APIConfig = {
    components: ['RadioButtonComponent'],
  };
}
