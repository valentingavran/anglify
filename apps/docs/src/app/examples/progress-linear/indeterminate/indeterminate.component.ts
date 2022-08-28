import { ProgressLinearComponent } from '@anglify/components';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './indeterminate.component.html',
  styleUrls: ['./indeterminate.component.scss'],
  imports: [ProgressLinearComponent],
})
export default class IndeterminateComponent {}
