import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BadgeComponent } from './badge.component';
import { BadgeDirective } from './badge.directive';
import { AnglifyCommonModule } from '../common/anglify-common.module';

@NgModule({
  declarations: [BadgeComponent, BadgeDirective],
  imports: [CommonModule, AnglifyCommonModule],
  exports: [BadgeDirective, AnglifyCommonModule],
})
export class BadgeModule {}
