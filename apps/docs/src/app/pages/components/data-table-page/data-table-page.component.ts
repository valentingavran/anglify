import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig } from '../../../app.interface';

@Component({
  selector: 'anglify-data-table-page',
  templateUrl: './data-table-page.component.html',
  styleUrls: ['./data-table-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTablePageComponent {
  public config: APIConfig = {
    components: ['DataTableComponent'],
    interfaces: ['DataTableHeader'],
  };
}
