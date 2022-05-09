import { ButtonModule, IconModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppearancesComponent } from './appearances/appearances.component';
import { BlockComponent } from './block/block.component';
import { DisabledComponent } from './disabled/disabled.component';
import { FabComponent } from './fab/fab.component';
import { WithIconComponent } from './with-icon/with-icon.component';

@NgModule({
  declarations: [BlockComponent, WithIconComponent, DisabledComponent, AppearancesComponent, FabComponent],
  imports: [CommonModule, ButtonModule, IconModule],
})
export class ButtonExamplesModule {}
