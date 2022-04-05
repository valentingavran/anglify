import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabComponent {}

export default FabComponent;
