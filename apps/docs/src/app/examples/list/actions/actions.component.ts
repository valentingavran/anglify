import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsComponent {}

export default ActionsComponent;
