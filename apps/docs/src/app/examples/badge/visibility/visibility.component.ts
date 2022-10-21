import { BadgeComponent, CheckboxComponent, IconComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [BadgeComponent, IconComponent, CheckboxComponent],
  templateUrl: './visibility.component.html',
  styleUrls: ['./visibility.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class VisibilityComponent {
  protected visible: boolean | undefined = true;
}
