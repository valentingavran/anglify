import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dialog-test',
  template: '<div>some more testing hahahahahahaha <button>test</button></div>',
  styles: [''],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTestComponent {}
