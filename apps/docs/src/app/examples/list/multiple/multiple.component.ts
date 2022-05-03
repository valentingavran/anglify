import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleComponent {}

export default MultipleComponent;
