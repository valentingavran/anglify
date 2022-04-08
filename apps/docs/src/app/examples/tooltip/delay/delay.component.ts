import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'anglify-delay',
  templateUrl: './delay.component.html',
  styleUrls: ['./delay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DelayComponent {}
export default DelayComponent;
