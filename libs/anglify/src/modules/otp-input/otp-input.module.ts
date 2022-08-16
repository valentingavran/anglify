import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OtpInputComponent } from './otp-input.component';

@NgModule({
  declarations: [OtpInputComponent],
  imports: [CommonModule],
  exports: [OtpInputComponent],
})
export class OtpInputModule {}
