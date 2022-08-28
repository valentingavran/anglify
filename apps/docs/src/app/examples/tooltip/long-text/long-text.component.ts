import { ButtonComponent, TooltipDirective } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './long-text.component.html',
  styleUrls: ['./long-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TooltipDirective, ButtonComponent],
})
export default class LongTextComponent {}
