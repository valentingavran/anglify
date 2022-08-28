import { ChipComponent, IconComponent, ItemGroupComponent, SlotDirective } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './slots.component.html',
  styleUrls: ['./slots.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChipComponent, IconComponent, ItemGroupComponent, SlotDirective],
})
export default class SlotsComponent {}
