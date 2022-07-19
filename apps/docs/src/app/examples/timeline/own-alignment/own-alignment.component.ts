import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './own-alignment.component.html',
  styleUrls: ['./own-alignment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OwnAlignmentComponent {}

export default OwnAlignmentComponent;
