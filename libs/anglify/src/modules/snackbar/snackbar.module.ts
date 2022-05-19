import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SnackbarComponent } from './snackbar.component';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [SnackbarComponent],
  imports: [CommonModule, OverlayModule, ButtonModule, IconModule],
  exports: [SnackbarComponent],
})
export class SnackbarModule {}
