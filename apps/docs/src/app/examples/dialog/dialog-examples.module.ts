import { ButtonModule, DialogModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SimpleComponent } from './simple/simple.component';

@NgModule({
  declarations: [SimpleComponent],
  imports: [CommonModule, ButtonModule, DialogModule],
})
export class DialogExamplesModule {}
