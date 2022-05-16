import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DefaultComponent {}
export default DefaultComponent;
