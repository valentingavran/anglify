import { CheckboxComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './indeterminate.component.html',
  styleUrls: ['./indeterminate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CheckboxComponent],
})
export default class IndeterminateComponent {}
