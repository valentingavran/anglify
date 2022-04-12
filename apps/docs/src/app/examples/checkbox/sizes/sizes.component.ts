import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sizes',
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesComponent {}

export default SizesComponent;
