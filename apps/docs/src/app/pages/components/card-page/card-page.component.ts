import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig } from '../../../app.interface';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPageComponent {
  public config: APIConfig = {
    components: ['CardComponent'],
  };
}
