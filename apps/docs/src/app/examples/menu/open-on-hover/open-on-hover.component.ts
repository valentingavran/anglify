import { ButtonComponent, MenuComponent, SlotDirective, ListItemComponent, ListItemTitleComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [ButtonComponent, MenuComponent, SlotDirective, ListItemComponent, ListItemTitleComponent],
  templateUrl: './open-on-hover.component.html',
  styleUrls: ['./open-on-hover.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OpenOnHoverComponent {}
