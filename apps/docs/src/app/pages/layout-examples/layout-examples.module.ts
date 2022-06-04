import { ButtonModule, CardModule, IconModule, ListModule, NavDrawerModule, ToolbarModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseComponent } from './base/base.component';
import { ConstrainedComponent } from './constrained/constrained.component';
import { LayoutExamplesRoutingModule } from './layout-examples-routing.module';

@NgModule({
  declarations: [BaseComponent, ConstrainedComponent],
  imports: [CommonModule, LayoutExamplesRoutingModule, NavDrawerModule, ToolbarModule, ButtonModule, IconModule, CardModule, ListModule],
})
export class LayoutExamplesModule {}
