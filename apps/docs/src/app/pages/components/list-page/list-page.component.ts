import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig, ComponentPageModule } from '../../../app.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: ComponentPageModule,
})
export class ListPageComponent {
  public config: APIConfig = {
    components: [
      'ListComponent',
      'ListGroupComponent',
      'ListItemComponent',
      'ListItemDescriptionComponent',
      'ListItemGroupComponent',
      'ListItemTitleComponent',
    ],
  };

  public doSomething() {}
}
