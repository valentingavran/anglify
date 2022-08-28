import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig, ComponentPageModule } from '../../../app.interface';

@Component({
  selector: 'anglify-breadcrumbs-page',
  templateUrl: './breadcrumbs-page.component.html',
  styleUrls: ['./breadcrumbs-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: ComponentPageModule,
})
export class BreadcrumbsPageComponent {
  public config: APIConfig = {
    components: ['BreadcrumbsComponent'],
  };
}
