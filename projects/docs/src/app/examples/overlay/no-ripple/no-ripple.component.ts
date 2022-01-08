import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-no-ripple',
  templateUrl: './no-ripple.component.html',
  styleUrls: ['./no-ripple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoRipple {}

export default NoRipple;
