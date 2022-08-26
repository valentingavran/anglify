import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig } from '../../../app.interface';

@Component({
  selector: 'anglify-button-group-page',
  templateUrl: './button-group-page.component.html',
  styleUrls: ['./button-group-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupPageComponent {
  public config: APIConfig = {
    components: ['ButtonGroupComponent', 'ButtonGroupItemComponent'],
  };
}
