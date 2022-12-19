import {
  ButtonComponent,
  CardComponent,
  DividerComponent,
  IconComponent,
  ListItemComponent,
  ListItemTitleComponent,
  MenuComponent,
  SlotDirective,
  SnackbarService,
  ToolbarComponent,
} from '@anglify/components';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    ToolbarComponent,
    MenuComponent,
    SlotDirective,
    ButtonComponent,
    IconComponent,
    ListItemComponent,
    ListItemTitleComponent,
    DividerComponent,
  ],
  templateUrl: './use-in-components.component.html',
  styleUrls: ['./use-in-components.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class UseInComponentsComponent {
  public constructor(private readonly snackbar: SnackbarService) {}

  protected cut() {
    this.snackbar.open({ data: { label: 'Cut selected' } });
  }

  protected copy() {
    this.snackbar.open({ data: { label: 'Copy selected' } });
  }

  protected paste() {
    this.snackbar.open({ data: { label: 'Paste selected' } });
  }

  protected webClipboard() {
    this.snackbar.open({ data: { label: 'Web Clipboard selected' } });
  }
}
