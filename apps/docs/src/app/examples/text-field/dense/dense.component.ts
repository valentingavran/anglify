import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dense',
  templateUrl: './dense.component.html',
  styleUrls: ['./dense.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DenseComponent {}

export default DenseComponent;
