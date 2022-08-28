import { OtpInputComponent, SnackbarService } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './completed-event.component.html',
  styleUrls: ['./completed-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OtpInputComponent],
})
export default class CompletedEventComponent {
  public constructor(public snackbarService: SnackbarService) {}

  public onComplete(otp: string) {
    this.snackbarService.open({ data: { label: `OTP is ${otp}` } });
  }
}
