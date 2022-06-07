import { TooltipSettings } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-custom-mounting-point',
  templateUrl: './custom-mounting-point.component.html',
  styleUrls: ['./custom-mounting-point.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomMountingPointComponent {
  public newMountingPoint = document.body;
  public config: TooltipSettings = { mountingPoint: this.newMountingPoint };
}

export default CustomMountingPointComponent;
