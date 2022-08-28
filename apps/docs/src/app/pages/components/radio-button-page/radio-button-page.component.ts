import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig, ComponentPageModule } from '../../../app.interface';

@Component({
  selector: 'anglify-radio-button-page',
  templateUrl: './radio-button-page.component.html',
  styleUrls: ['./radio-button-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: ComponentPageModule,
})
export class RadioButtonPageComponent {
  public config: APIConfig = {
    components: ['RadioButtonComponent'],
  };
}
