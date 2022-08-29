import { IconComponent, InputDirective, SlotDirective, TextAreaComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './autoresize.component.html',
  styleUrls: ['./autoresize.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextAreaComponent, IconComponent, SlotDirective, InputDirective],
})
export default class AutoresizeComponent {}
