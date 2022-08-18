import { SnackbarService } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'anglify-completed-event',
  templateUrl: './completed-event.component.html',
  styleUrls: ['./completed-event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompletedEventComponent {
  public constructor(public snackbarService: SnackbarService) {}

  public onComplete(otp: string) {
    this.snackbarService.open({ data: { label: `OTP is ${otp}` } });
  }
}
export default CompletedEventComponent;
