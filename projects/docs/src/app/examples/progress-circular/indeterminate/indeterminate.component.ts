import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-indeterminate',
  templateUrl: './indeterminate.component.html',
  styleUrls: ['./indeterminate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndeterminateComponent {}

export default IndeterminateComponent;
