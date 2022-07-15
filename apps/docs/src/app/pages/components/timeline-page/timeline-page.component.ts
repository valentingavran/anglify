import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig } from '../../../app.interface';

@Component({
  selector: 'app-timeline-page',
  templateUrl: './timeline-page.component.html',
  styleUrls: ['./timeline-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelinePageComponent {
  public config: APIConfig = {
    components: ['TimelineComponent', 'TimelineItemComponent'],
  };
}
