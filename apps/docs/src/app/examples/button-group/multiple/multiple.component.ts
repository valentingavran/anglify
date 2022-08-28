import { ButtonGroupComponent, ButtonGroupItemComponent, IconComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonGroupComponent, ButtonGroupItemComponent, IconComponent],
})
export default class MultipleComponent {}
