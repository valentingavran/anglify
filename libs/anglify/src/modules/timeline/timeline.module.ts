import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TimelineItemComponent } from './components/timeline-item/timeline-item.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { AnglifyCommonModule } from '../common/anglify-common.module';

@NgModule({
  declarations: [TimelineComponent, TimelineItemComponent],
  imports: [CommonModule, AnglifyCommonModule],
  exports: [AnglifyCommonModule, TimelineComponent, TimelineItemComponent],
})
export class TimelineModule {}
