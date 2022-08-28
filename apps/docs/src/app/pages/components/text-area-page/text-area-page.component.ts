import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig, ComponentPageModule } from '../../../app.interface';

@Component({
  selector: 'anglify-text-area-page',
  templateUrl: './text-area-page.component.html',
  styleUrls: ['./text-area-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: ComponentPageModule,
})
export class TextAreaPageComponent {
  public config: APIConfig = {
    components: ['TextAreaComponent'],
  };
}
