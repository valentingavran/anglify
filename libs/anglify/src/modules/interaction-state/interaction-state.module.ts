import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InteractionStateDirective } from './interaction-state.directive';

@NgModule({
  declarations: [InteractionStateDirective],
  imports: [CommonModule],
  exports: [InteractionStateDirective],
})
export class InteractionStateModule {}
