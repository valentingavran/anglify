import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './breadcrumbs.component';
import { AnglifyCommonModule } from '../common/anglify-common.module';

@NgModule({
  declarations: [BreadcrumbsComponent],
  imports: [CommonModule, AnglifyCommonModule, RouterModule],
  exports: [BreadcrumbsComponent, AnglifyCommonModule, RouterModule],
})
export class BreadcrumbsModule {}
