import { CheckboxComponent, IconComponent, SlotDirective } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './sizes.component.html',
  styleUrls: ['./sizes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CheckboxComponent, IconComponent, SlotDirective],
})
export default class SizesComponent {}
