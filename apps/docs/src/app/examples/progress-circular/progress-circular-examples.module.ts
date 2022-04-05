import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IndeterminateComponent } from './indeterminate/indeterminate.component';
import ShowProgressComponent from './show-progress/show-progress.component';
import { RotationComponent } from './rotation/rotation.component';
import { ProgressCircularModule } from '@anglify/components';

@NgModule({
  declarations: [IndeterminateComponent, ShowProgressComponent, RotationComponent],
  imports: [CommonModule, ProgressCircularModule],
})
export class ProgressCircularExamplesModule {}
