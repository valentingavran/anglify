import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'anglify-slots',
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlotsComponent {}

export default SlotsComponent;
