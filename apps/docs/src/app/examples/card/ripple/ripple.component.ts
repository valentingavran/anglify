import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'anglify-ripple',
  templateUrl: './ripple.component.html',
  styleUrls: ['./ripple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RippleComponent {}

export default RippleComponent;
