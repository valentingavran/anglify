import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'anglify-hidden-input',
  templateUrl: './hidden-input.component.html',
  styleUrls: ['./hidden-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HiddenInputComponent {}
export default HiddenInputComponent;
