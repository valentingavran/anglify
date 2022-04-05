import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-readonly',
  templateUrl: './readonly.component.html',
  styleUrls: ['./readonly.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReadonlyComponent {}

export default ReadonlyComponent;
