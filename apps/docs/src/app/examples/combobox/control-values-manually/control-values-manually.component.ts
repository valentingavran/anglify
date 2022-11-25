import { ButtonComponent, ComboboxComponent, SlotDirective } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { top10Movies } from '../../examples';

@Component({
  standalone: true,
  imports: [CommonModule, ComboboxComponent, SlotDirective, ButtonComponent],
  templateUrl: './control-values-manually.component.html',
  styleUrls: ['./control-values-manually.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ControlValuesManuallyComponent {
  protected top10Movies = top10Movies;

  protected selection = ['1010', '1004'];

  protected toggleFightClub() {
    if (this.selection.includes('1010')) {
      this.selection = this.selection.filter(id => id !== '1010');
    } else {
      this.selection = [...this.selection, '1010'];
    }
  }
}
