import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'anglify-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlankComponent {}
