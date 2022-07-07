import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './autoresize.component.html',
  styleUrls: ['./autoresize.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoResizeComponent {}

export default AutoResizeComponent;
