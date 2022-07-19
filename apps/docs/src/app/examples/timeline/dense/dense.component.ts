import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './dense.component.html',
  styleUrls: ['./dense.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DenseComponent {}

export default DenseComponent;
