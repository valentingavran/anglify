import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'anglify-elevations',
  templateUrl: './elevations.component.html',
  styleUrls: ['./elevations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElevationsComponent {}
export default ElevationsComponent;
