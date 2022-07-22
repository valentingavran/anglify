import { IconModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClickableComponent } from './clickable/clickable.component';
import { DifferentSizesComponent } from './different-sizes/different-sizes.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [DifferentSizesComponent, ClickableComponent],
})
export class IconExamplesModule {}
