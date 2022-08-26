import { SimpleTableModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FixedFooterComponent } from './fixed-footer/fixed-footer.component';
import { FixedHeaderComponent } from './fixed-header/fixed-header.component';
import { FixedHeightComponent } from './fixed-height/fixed-height.component';
import { NormalComponent } from './normal/normal.component';

@NgModule({
  declarations: [NormalComponent, FixedHeightComponent, FixedFooterComponent, FixedHeaderComponent],
  imports: [CommonModule, SimpleTableModule],
})
export class TableExamplesModule {}
