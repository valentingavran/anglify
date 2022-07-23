import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig } from '../../../app.interface';

@Component({
  selector: 'app-button-page',
  templateUrl: './button-page.component.html',
  styleUrls: ['./button-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonPageComponent {
  public config: APIConfig = {
    components: ['ButtonComponent'],
  };
}
