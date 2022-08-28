import { SlotDirective, TimelineComponent, TimelineItemComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './opposite.component.html',
  styleUrls: ['./opposite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TimelineComponent, TimelineItemComponent, SlotDirective],
})
export default class OppositeComponent {}
