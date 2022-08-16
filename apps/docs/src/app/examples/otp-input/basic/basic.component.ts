import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'anglify-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicComponent {
  public otp = '';
  public length = 4;

  public clearOTPInput() {
    this.otp = '';
  }
}
export default BasicComponent;
