import { ButtonModule, OtpInputModule, SnackbarModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicComponent } from './basic/basic.component';
import { CompletedEventComponent } from './completed-event/completed-event.component';
import { HiddenInputComponent } from './hidden-input/hidden-input.component';
import { ReactiveFormsComponent } from './reactive-forms/reactive-forms.component';

@NgModule({
  declarations: [HiddenInputComponent, CompletedEventComponent, ReactiveFormsComponent, BasicComponent],
  imports: [CommonModule, OtpInputModule, SnackbarModule, FormsModule, ReactiveFormsModule, ButtonModule],
})
export class OtpInputExampleModule {}
