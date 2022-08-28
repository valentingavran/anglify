import { CardComponent, ItemGroupComponent, SlotDirective } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  templateUrl: './form-control.component.html',
  styleUrls: ['./form-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ItemGroupComponent, CardComponent, ReactiveFormsModule, SlotDirective],
})
export default class FormControlComponent {
  public control = new FormControl([1]);
}
