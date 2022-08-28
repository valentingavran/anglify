import { IconComponent, InputDirective, SlotDirective, TextFieldComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './label-slot.component.html',
  styleUrls: ['./label-slot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextFieldComponent, IconComponent, SlotDirective, InputDirective],
})
export default class LabelSlotComponent {}
