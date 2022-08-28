import { TimelineComponent, TimelineItemComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './own-alignment.component.html',
  styleUrls: ['./own-alignment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TimelineComponent, TimelineItemComponent],
})
export default class OwnAlignmentComponent {}
