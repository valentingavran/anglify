import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExpansionPanelComponent } from './components/expansion-panel/expansion-panel.component';
import { ExpansionPanelsComponent } from './components/expansion-panels/expansion-panels.component';
import { AnglifyCommonModule } from '../common/anglify-common.module';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [ExpansionPanelComponent, ExpansionPanelsComponent],
  imports: [CommonModule, AnglifyCommonModule, IconModule],
  exports: [ExpansionPanelComponent, ExpansionPanelsComponent, AnglifyCommonModule],
})
export class ExpansionPanelsModule {}
