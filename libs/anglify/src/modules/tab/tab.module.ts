import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabGroupComponent } from './components/tab-group/tab-group.component';
import { TabComponent } from './components/tab/tab.component';
import { AnglifyCommonModule } from '../common/anglify-common.module';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [TabComponent, TabGroupComponent],
  imports: [AnglifyCommonModule, CommonModule, IconModule],
  exports: [AnglifyCommonModule, TabComponent, TabGroupComponent],
})
export class TabModule {}
