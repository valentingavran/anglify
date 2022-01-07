import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-different-sizes',
  templateUrl: './different-sizes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DifferentSizesComponent {}
export default DifferentSizesComponent;
