import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledComponent {}

export default DisabledComponent;
