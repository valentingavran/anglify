import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-with-icon',
  templateUrl: './with-icon.component.html',
  styleUrls: ['./with-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithIconComponent {}

export default WithIconComponent;
