import {
  ButtonComponent,
  MenuComponent,
  SlotDirective,
  ListItemComponent,
  ListItemTitleComponent,
  TooltipDirective,
} from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [ButtonComponent, MenuComponent, SlotDirective, ListItemComponent, ListItemTitleComponent, TooltipDirective],
  templateUrl: './with-tooltip.component.html',
  styleUrls: ['./with-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class WithTooltipComponent {}
