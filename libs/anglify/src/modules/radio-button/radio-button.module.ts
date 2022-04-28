import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RadioButtonComponent } from './radio-button.component';
import { PipeModule } from '../../pipes/pipe.module';
import { InteractionStateModule } from '../interaction-state/interaction-state.module';

@NgModule({
  declarations: [RadioButtonComponent],
  imports: [CommonModule, FormsModule, InteractionStateModule, PipeModule],
  exports: [RadioButtonComponent, InteractionStateModule],
})
export class RadioButtonModule {}
