import { CardComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './ripple.component.html',
  styleUrls: ['./ripple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CardComponent],
})
export default class RippleComponent {}
