import { IconComponent, SlotDirective, TimelineComponent, TimelineItemComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './reverse.component.html',
  styleUrls: ['./reverse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TimelineComponent, TimelineItemComponent, IconComponent, SlotDirective],
})
export default class ReverseComponent {}
