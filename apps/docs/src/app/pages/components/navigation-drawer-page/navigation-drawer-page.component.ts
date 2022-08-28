import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig, ComponentPageModule } from '../../../app.interface';

@Component({
  selector: 'app-navigation-drawer-page',
  templateUrl: './navigation-drawer-page.component.html',
  styleUrls: ['./navigation-drawer-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: ComponentPageModule,
})
export class NavigationDrawerPageComponent {
  public config: APIConfig = {
    components: ['NavigationDrawerComponent'],
  };
}
