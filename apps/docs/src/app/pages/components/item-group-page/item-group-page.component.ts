import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig } from '../../../app.interface';

@Component({
  templateUrl: './item-group-page.component.html',
  styleUrls: ['./item-group-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemGroupPageComponent {
  public config: APIConfig = {
    components: ['ItemGroupComponent'],
  };
}
