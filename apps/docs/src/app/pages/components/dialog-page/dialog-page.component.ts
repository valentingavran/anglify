import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig } from '../../../app.interface';

@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialog-page.component.html',
  styleUrls: ['./dialog-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogPageComponent {
  public config: APIConfig = {
    services: ['DialogService'],
  };
}
