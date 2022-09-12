import { ProgressLinearComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './indeterminate.component.html',
  styleUrls: ['./indeterminate.component.scss'],
  imports: [ProgressLinearComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class IndeterminateComponent {}
