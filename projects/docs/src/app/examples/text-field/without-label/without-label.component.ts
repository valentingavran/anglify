import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-without-label',
  templateUrl: './without-label.component.html',
  styleUrls: ['./without-label.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithoutLabelComponent {}

export default WithoutLabelComponent;
