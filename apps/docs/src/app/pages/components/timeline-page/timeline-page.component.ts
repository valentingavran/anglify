import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-timeline-page',
  templateUrl: './timeline-page.component.html',
  styleUrls: ['./timeline-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelinePageComponent {}
