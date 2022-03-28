import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppearancesComponent } from './appearances/appearances.component';
import { BlockComponent } from './block/block.component';
import { DisabledComponent } from './disabled/disabled.component';
import { FabComponent } from './fab/fab.component';
import { SizingComponent } from './sizing/sizing.component';
import { WithIconComponent } from './with-icon/with-icon.component';
import { ButtonModule } from '../../../../../anglify/src/modules/button/button.module';
import { IconModule } from '../../../../../anglify/src/modules/icon/icon.module';

@NgModule({
  declarations: [BlockComponent, WithIconComponent, SizingComponent, DisabledComponent, AppearancesComponent, FabComponent],
  imports: [CommonModule, ButtonModule, IconModule],
})
export class ButtonExamplesModule {}
