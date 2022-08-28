import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig, ComponentPageModule } from '../../../app.interface';

@Component({
  selector: 'app-stepper-page',
  templateUrl: './stepper-page.component.html',
  styleUrls: ['./stepper-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: ComponentPageModule,
})
export class StepperPageComponent {
  public config: APIConfig = {
    components: ['StepperComponent'],
    directives: ['StepDirective'],
    services: ['StepperService'],
  };
}
