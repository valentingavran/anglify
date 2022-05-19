import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './appearances.component.html',
  styleUrls: ['./appearances.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppearancesComponent {}

export default AppearancesComponent;
