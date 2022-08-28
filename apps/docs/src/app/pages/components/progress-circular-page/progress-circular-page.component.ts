import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig, ComponentPageModule } from '../../../app.interface';

@Component({
  selector: 'app-progress-circular-page',
  templateUrl: './progress-circular-page.component.html',
  styleUrls: ['./progress-circular-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: ComponentPageModule,
})
export class ProgressCircularPageComponent {
  public config: APIConfig = {
    components: ['ProgressCircularComponent'],
  };
}
