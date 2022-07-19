import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './opposite.component.html',
  styleUrls: ['./opposite.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OppositeComponent {}

export default OppositeComponent;
