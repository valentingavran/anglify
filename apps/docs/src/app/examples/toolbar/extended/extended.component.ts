import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'anglify-extended',
  templateUrl: './extended.component.html',
  styleUrls: ['./extended.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExtendedComponent {}
export default ExtendedComponent;
