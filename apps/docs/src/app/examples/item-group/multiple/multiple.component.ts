import { CardComponent, ItemGroupComponent, SlotDirective } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ItemGroupComponent, CardComponent, SlotDirective],
})
export default class MultipleComponent {}
