import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig } from '../../../app.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
