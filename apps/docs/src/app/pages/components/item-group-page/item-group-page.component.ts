import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig, ComponentPageModule } from '../../../app.interface';

@Component({
  templateUrl: './item-group-page.component.html',
  styleUrls: ['./item-group-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: ComponentPageModule,
})
export class ItemGroupPageComponent {
  public config: APIConfig = {
    components: ['ItemGroupComponent'],
  };
}
