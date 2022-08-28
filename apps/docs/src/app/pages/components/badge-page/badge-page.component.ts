import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig, ComponentPageModule } from '../../../app.interface';

@Component({
  selector: 'anglify-badge-page',
  templateUrl: './badge-page.component.html',
  styleUrls: ['./badge-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: ComponentPageModule,
})
export class BadgePageComponent {
  public config: APIConfig = {
    components: ['BadgeComponent'],
    directives: ['BadgeDirective'],
  };
}
