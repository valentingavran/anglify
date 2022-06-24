import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './custom-icon.component.html',
  styleUrls: ['./custom-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomIconComponent {}

export default CustomIconComponent;
