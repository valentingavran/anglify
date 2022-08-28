import { ButtonComponent, IconComponent, TooltipDirective } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './custom-content.component.html',
  styleUrls: ['./custom-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TooltipDirective, ButtonComponent, IconComponent],
})
export default class CustomContentComponent {}
