import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToolbarComponent } from './toolbar.component';
import { AnglifyCommonModule } from '../common/anglify-common.module';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, AnglifyCommonModule],
  exports: [ToolbarComponent, AnglifyCommonModule],
})
export class ToolbarModule {}
