import { ProgressCircularComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './indeterminate.component.html',
  styleUrls: ['./indeterminate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressCircularComponent],
})
export default class IndeterminateComponent {}
