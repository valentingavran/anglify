import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './icon-indicator.component.html',
  styleUrls: ['./icon-indicator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconIndicatorComponent {}

export default IconIndicatorComponent;
