import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig } from '../../../app.interface';

@Component({
  selector: 'app-tooltip-page',
  templateUrl: './tooltip-page.component.html',
  styleUrls: ['./tooltip-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipPageComponent {
  public config: APIConfig = {
    directives: ['TooltipDirective'],
  };
}
