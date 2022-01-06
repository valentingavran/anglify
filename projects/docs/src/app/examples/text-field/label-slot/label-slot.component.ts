import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-label-slot',
  templateUrl: './label-slot.component.html',
  styleUrls: ['./label-slot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelSlotComponent {}

export default LabelSlotComponent;
