import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockComponent } from './block/block.component';
import { WithIconComponent } from './with-icon/with-icon.component';
import { SizingComponent } from './sizing/sizing.component';
import { DisabledComponent } from './disabled/disabled.component';
import { ButtonModule } from '../../../../../anglify/src/modules/button/button.module';
import { IconModule } from '../../../../../anglify/src/modules/icon/icon.module';
import { AppearancesComponent } from './appearances/appearances.component';
import { FabComponent } from './fab/fab.component';

@NgModule({
  declarations: [BlockComponent, WithIconComponent, SizingComponent, DisabledComponent, AppearancesComponent, FabComponent],
  imports: [CommonModule, ButtonModule, IconModule],
})
export class ButtonExamplesModule {}
