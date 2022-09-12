import { ButtonComponent, TooltipDirective, type TooltipSettings } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './custom-mounting-point.component.html',
  styleUrls: ['./custom-mounting-point.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TooltipDirective, ButtonComponent],
})
export default class CustomMountingPointComponent {
  public newMountingPoint = document.body;

  public config: TooltipSettings = { mountingPoint: this.newMountingPoint };
}
