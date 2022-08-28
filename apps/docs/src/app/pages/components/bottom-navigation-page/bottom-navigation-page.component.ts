import { Component, ChangeDetectionStrategy } from '@angular/core';
import { APIConfig, ComponentPageModule } from '../../../app.interface';

@Component({
  selector: 'anglify-bottom-navigation-page',
  templateUrl: './bottom-navigation-page.component.html',
  styleUrls: ['./bottom-navigation-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: ComponentPageModule,
})
export class BottomNavigationPageComponent {
  public config: APIConfig = {
    components: ['BottomNavigationComponent', 'BottomNavigationItemComponent'],
  };
}
