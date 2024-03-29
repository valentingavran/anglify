import { ButtonComponent, ListItemComponent, ListItemTitleComponent, MenuComponent, SlotDirective } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [ButtonComponent, MenuComponent, SlotDirective, ListItemComponent, ListItemTitleComponent],
  templateUrl: './offset.component.html',
  styleUrls: ['./offset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OffsetComponent {}
