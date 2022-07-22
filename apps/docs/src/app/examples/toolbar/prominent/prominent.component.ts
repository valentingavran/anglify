import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'anglify-prominent',
  templateUrl: './prominent.component.html',
  styleUrls: ['./prominent.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProminentComponent {}
export default ProminentComponent;
