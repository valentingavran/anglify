import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'anglify-buffer',
  templateUrl: './buffer.component.html',
  styleUrls: ['./buffer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BufferComponent {}
export default BufferComponent;
