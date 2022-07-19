import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './reverse.component.html',
  styleUrls: ['./reverse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReverseComponent {}

export default ReverseComponent;
