import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-different-positions',
  templateUrl: './different-positions.component.html',
  styleUrls: ['./different-positions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DifferentPositionsComponent {}

export default DifferentPositionsComponent;
