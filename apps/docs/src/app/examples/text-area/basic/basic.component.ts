import { IconComponent, InputDirective, SlotDirective, TextAreaComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextAreaComponent, IconComponent, SlotDirective, InputDirective],
})
export default class BasicComponent {}
