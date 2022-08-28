import { OtpInputComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './hidden-input.component.html',
  styleUrls: ['./hidden-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OtpInputComponent],
})
export default class HiddenInputComponent {}
