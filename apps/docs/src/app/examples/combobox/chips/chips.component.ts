import { ChipComponent, ComboboxComponent, SlotDirective } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { top10Movies } from '../../examples';

@Component({
  standalone: true,
  imports: [CommonModule, ComboboxComponent, SlotDirective, ChipComponent],
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ChipsComponent {
  protected top10Movies = top10Movies;
}
