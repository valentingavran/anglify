import {
  AutocompleteComponent,
  ButtonComponent,
  ChipComponent,
  ClickStopPropagationDirective,
  IconComponent,
  ListItemComponent,
  ListItemTitleComponent,
  SlotDirective,
  SnackbarService,
} from '@anglify/components';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { top10Movies } from '../../examples';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    AutocompleteComponent,
    SlotDirective,
    ListItemComponent,
    ListItemTitleComponent,
    ChipComponent,
    IconComponent,
    ButtonComponent,
    ClickStopPropagationDirective,
  ],
  templateUrl: './no-data-with-chips.component.html',
  styleUrls: ['./no-data-with-chips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NoDataWithChipsComponent {
  protected top10Movies = top10Movies;

  public constructor(private readonly snackbar: SnackbarService) {}

  protected openDocs() {
    this.snackbar.open({ data: { label: 'Open docs clicked' } });
  }
}
