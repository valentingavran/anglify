import { ButtonComponent, OtpInputComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, OtpInputComponent, FormsModule],
})
export default class BasicComponent {
  public otp = '';
  public length = 4;

  public clearOTPInput() {
    this.otp = '';
  }
}
