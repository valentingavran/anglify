import { ChipComponent, ItemGroupComponent, SlotDirective } from '@anglify/components';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './multiple-mandatory.component.html',
  styleUrls: ['./multiple-mandatory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ChipComponent, ItemGroupComponent, SlotDirective],
})
export default class MultipleMandatoryComponent {}
