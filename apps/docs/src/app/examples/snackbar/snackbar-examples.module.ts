import { ButtonModule, SnackbarModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import BasicComponent from './basic/basic.component';
import IndefinitelyComponent from './indefinitely/indefinitely.component';

@NgModule({
  declarations: [BasicComponent, IndefinitelyComponent],
  imports: [CommonModule, SnackbarModule, ButtonModule],
})
export class SnackbarExamplesModule {}
