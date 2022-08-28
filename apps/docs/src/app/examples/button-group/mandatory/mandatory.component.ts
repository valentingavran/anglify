import { ButtonGroupComponent, ButtonGroupItemComponent, IconComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './mandatory.component.html',
  styleUrls: ['./mandatory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonGroupComponent, ButtonGroupItemComponent, IconComponent],
})
export default class MandatoryComponent {}
