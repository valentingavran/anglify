import {
  ButtonComponent,
  CheckboxComponent,
  ListItemComponent,
  ListItemTitleComponent,
  MenuComponent,
  SlotDirective,
} from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [ButtonComponent, MenuComponent, SlotDirective, ListItemComponent, ListItemTitleComponent, CheckboxComponent],
  templateUrl: './close-on-click.component.html',
  styleUrls: ['./close-on-click.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CloseOnClickComponent {
  protected closeOnOutsideClick: boolean | undefined = true;

  protected closeOnMenuClick: boolean | undefined = true;
}
