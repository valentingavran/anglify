import { ButtonModule, SnackbarModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import ConfigurationComponent from './configuration/configuration.component';

@NgModule({
  declarations: [ConfigurationComponent],
  imports: [CommonModule, SnackbarModule, ButtonModule],
})
export class SnackbarExamplesModule {}
