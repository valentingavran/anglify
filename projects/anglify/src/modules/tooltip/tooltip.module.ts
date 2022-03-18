import { NgModule } from '@angular/core';
import { TooltipComponent } from './components/tooltip/tooltip.component';
import { TooltipDirective } from './tooltip.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TooltipDirective, TooltipComponent],
  exports: [TooltipDirective],
  imports: [CommonModule],
})
export class TooltipModule {}
