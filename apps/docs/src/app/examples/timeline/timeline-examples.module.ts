import { IconModule, TimelineModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import DenseComponent from './dense/dense.component';
import IconIndicatorComponent from './icon-indicator/icon-indicator.component';
import OppositeComponent from './opposite/opposite.component';
import OwnAlignmentComponent from './own-alignment/own-alignment.component';
import ReverseComponent from './reverse/reverse.component';

@NgModule({
  declarations: [DenseComponent, IconIndicatorComponent, OppositeComponent, OwnAlignmentComponent, ReverseComponent],
  imports: [CommonModule, TimelineModule, IconModule],
  exports: [],
})
export class TimelineExamplesModule {}
