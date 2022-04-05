import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FixedFooterComponent } from './fixed-footer/fixed-footer.component';
import { FixedHeaderComponent } from './fixed-header/fixed-header.component';
import { FixedHeightComponent } from './fixed-height/fixed-height.component';
import { NormalComponent } from './normal/normal.component';
import { TableModule } from '../../../../../anglify/src/modules/table/table.module';

@NgModule({
  declarations: [NormalComponent, FixedHeightComponent, FixedFooterComponent, FixedHeaderComponent],
  imports: [CommonModule, TableModule],
})
export class TableExamplesModule {}
