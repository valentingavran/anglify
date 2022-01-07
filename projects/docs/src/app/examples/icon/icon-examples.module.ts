import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconModule } from '../../../../../anglify/src/modules/icon/icon.module';
import { DifferentSizesComponent } from './different-sizes/different-sizes.component';
import { ClickableComponent } from './clickable/clickable.component';
import { DisabledComponent } from './disabled/disabled.component';

@NgModule({
  imports: [CommonModule, IconModule],
  declarations: [DifferentSizesComponent, ClickableComponent, DisabledComponent],
})
export class IconExamplesModule {}
