import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig, ComponentPageModule } from '../../../app.interface';

@Component({
  selector: 'app-tooltip-page',
  standalone: true,
  templateUrl: './tooltip-page.component.html',
  styleUrls: ['./tooltip-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: ComponentPageModule,
})
export class TooltipPageComponent {
  public config: APIConfig = {
    directives: ['TooltipDirective'],
  };
}
