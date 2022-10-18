import { ButtonComponent, ListItemComponent, ListItemTitleComponent, MenuComponent, SlotDirective } from '@anglify/components';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './show-hide-manually.component.html',
  styleUrls: ['./show-hide-manually.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, MenuComponent, SlotDirective, ListItemComponent, ListItemTitleComponent, AsyncPipe],
})
export default class ShowHideManuallyComponent {
  protected menuVisible = false;
}
