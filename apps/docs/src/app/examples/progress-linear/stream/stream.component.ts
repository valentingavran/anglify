import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'anglify-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamComponent {}

export default StreamComponent;
