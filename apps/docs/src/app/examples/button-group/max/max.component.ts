import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './max.component.html',
  styleUrls: ['./max.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaxComponent {}

export default MaxComponent;
