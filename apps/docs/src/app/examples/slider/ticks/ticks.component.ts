import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './ticks.component.html',
  styleUrls: ['./ticks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicksComponent {}
export default TicksComponent;
