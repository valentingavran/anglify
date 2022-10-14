import { CheckboxComponent, DividerComponent, SlotDirective } from '@anglify/components';
import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule, CheckboxComponent, SlotDirective, FormsModule, NgIf, DividerComponent],
  templateUrl: './divider-playground.component.html',
  styleUrls: ['./divider-playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerPlaygroundComponent {
  public vertical = false;

  public inset = false;
}
