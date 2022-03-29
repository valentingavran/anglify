import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressCircularModule } from 'projects/anglify/src/modules/progress-circular/progress-circular.module';
import { IndeterminateComponent } from './indeterminate/indeterminate.component';
import ShowProgressComponent from './show-progress/show-progress.component';
import { RotationComponent } from './rotation/rotation.component';

@NgModule({
  declarations: [IndeterminateComponent, ShowProgressComponent, RotationComponent],
  imports: [CommonModule, ProgressCircularModule],
})
export class ProgressCircularExamplesModule {}
