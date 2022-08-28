import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  template: '<div>Dialog works!</div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class DialogTestComponent {}
