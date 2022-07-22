import { ButtonModule, IconModule, TabModule, ToolbarModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CollapseComponent } from './collapse/collapse.component';
import ExtendedProminentComponent from './extended-prominent/extended-prominent.component';
import { ExtendedComponent } from './extended/extended.component';
import { ProminentComponent } from './prominent/prominent.component';
import { RegularComponent } from './regular/regular.component';

@NgModule({
  declarations: [RegularComponent, ExtendedComponent, CollapseComponent, ProminentComponent, ExtendedProminentComponent],
  imports: [CommonModule, ToolbarModule, IconModule, ButtonModule, TabModule],
})
export class ToolbarExampleModule {}
