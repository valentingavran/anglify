import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig, ComponentPageModule } from '../../../app.interface';

@Component({
  selector: 'app-snackbar-page',
  templateUrl: './snackbar-page.component.html',
  styleUrls: ['./snackbar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: ComponentPageModule,
})
export class SnackbarPageComponent {
  public config: APIConfig = {
    services: ['SnackbarService'],
  };
}
