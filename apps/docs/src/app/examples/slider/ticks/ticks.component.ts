import { SliderComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './ticks.component.html',
  styleUrls: ['./ticks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SliderComponent],
})
export class TicksComponent {}
export default TicksComponent;
