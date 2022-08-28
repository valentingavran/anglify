import { ProgressLinearComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './buffer.component.html',
  styleUrls: ['./buffer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProgressLinearComponent],
})
export default class BufferComponent {}
