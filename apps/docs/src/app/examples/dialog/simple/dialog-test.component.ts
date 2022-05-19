import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  template: '<div>Dialog works!</div>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTestComponent {}
