import { CardComponent, ItemGroupComponent, SlotDirective } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ItemGroupComponent, CardComponent, SlotDirective],
})
export default class DefaultComponent {}
