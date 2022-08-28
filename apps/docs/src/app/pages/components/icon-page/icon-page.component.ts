import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig, ComponentPageModule } from '../../../app.interface';

@Component({
  selector: 'app-icon-page',
  templateUrl: './icon-page.component.html',
  styleUrls: ['./icon-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: ComponentPageModule,
})
export class IconPageComponent {
  public config: APIConfig = {
    components: ['IconComponent'],
  };
}
