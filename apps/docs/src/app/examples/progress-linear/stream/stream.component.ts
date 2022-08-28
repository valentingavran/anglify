import { ProgressLinearComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressLinearComponent],
})
export default class StreamComponent {}
