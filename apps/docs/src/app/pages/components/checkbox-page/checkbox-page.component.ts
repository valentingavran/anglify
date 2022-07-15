import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig } from '../../../app.interface';

@Component({
  selector: 'app-checkbox-page',
  templateUrl: './checkbox-page.component.html',
  styleUrls: ['./checkbox-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckBoxPageComponent {
  public config: APIConfig = {
    components: ['CheckboxComponent'],
  };
}
