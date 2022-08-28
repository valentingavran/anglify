import { ButtonComponent, TooltipDirective } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './different-positions.component.html',
  styleUrls: ['./different-positions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TooltipDirective, ButtonComponent],
})
export default class DifferentPositionsComponent {}
