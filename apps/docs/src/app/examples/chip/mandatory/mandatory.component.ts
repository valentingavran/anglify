import { ChipComponent, ItemGroupComponent, SlotDirective } from '@anglify/components';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './mandatory.component.html',
  styleUrls: ['./mandatory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChipComponent, ItemGroupComponent, SlotDirective],
})
export default class MandatoryComponent {}
