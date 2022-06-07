import { ButtonModule, CardModule, IconModule, ListModule, NavigationDrawerModule, ToolbarModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseComponent } from './base/base.component';
import { ConstrainedComponent } from './constrained/constrained.component';
import { LayoutExamplesRoutingModule } from './layout-examples-routing.module';

@NgModule({
  declarations: [BaseComponent, ConstrainedComponent],
  imports: [
    CommonModule,
    LayoutExamplesRoutingModule,
    NavigationDrawerModule,
    ToolbarModule,
    ButtonModule,
    IconModule,
    CardModule,
    ListModule,
  ],
})
export class LayoutExamplesModule {}
