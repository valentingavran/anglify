import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APIConfig } from '../../../app.interface';

@Component({
  selector: 'anglify-otp-input-page',
  templateUrl: './otp-input-page.component.html',
  styleUrls: ['./otp-input-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtpInputPageComponent {
  public config: APIConfig = {
    components: ['OtpInputComponent'],
  };
}
