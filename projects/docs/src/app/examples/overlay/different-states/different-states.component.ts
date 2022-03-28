import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-different-states',
  templateUrl: './different-states.component.html',
  styleUrls: ['./different-states.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DifferentStatesComponent {}

export default DifferentStatesComponent;
