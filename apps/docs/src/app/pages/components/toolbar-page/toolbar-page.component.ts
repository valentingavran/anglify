import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig } from '../../../app.interface';

@Component({
  selector: 'app-toolbar-page',
  templateUrl: './toolbar-page.component.html',
  styleUrls: ['./toolbar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarPageComponent {
  public config: APIConfig = {
    components: ['ToolbarComponent'],
  };
}
