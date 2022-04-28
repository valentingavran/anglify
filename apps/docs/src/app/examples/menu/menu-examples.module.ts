import { ButtonModule, ListModule, MenuModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShowHideManuallyComponent } from './show-hide-manually/show-hide-manually.component';

@NgModule({
  declarations: [ShowHideManuallyComponent],
  imports: [CommonModule, ListModule, MenuModule, ButtonModule],
  exports: [ShowHideManuallyComponent],
})
export class MenuExamplesModule {}
