import {
  ButtonComponent,
  ChipComponent,
  ClickStopPropagationDirective,
  IconComponent,
  ListItemComponent,
  ListItemTitleComponent,
  SelectComponent,
  SlotDirective,
  SnackbarService,
} from '@anglify/components';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import type { Movie } from '../../examples';
import { top10Movies } from '../../examples';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    SelectComponent,
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
  protected top10Movies: Movie[] = top10Movies;

  public constructor(private readonly snackbar: SnackbarService) {}

  protected toggleItems() {
    if (this.top10Movies.length === 0) this.top10Movies = top10Movies;
    else this.top10Movies = [];
  }

  protected openDocs() {
    this.snackbar.open({ data: { label: 'Open docs clicked' } });
  }
}
