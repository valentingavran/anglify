import { BadgeComponent, IconComponent, SlotDirective } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [BadgeComponent, SlotDirective, IconComponent],
  templateUrl: './inline.component.html',
  styleUrls: ['./inline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InlineComponent {}
