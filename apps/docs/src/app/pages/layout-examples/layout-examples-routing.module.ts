import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { ConstrainedComponent } from './constrained/constrained.component';

const routes: Routes = [
  {
    path: 'base',
    component: BaseComponent,
  },
  {
    path: 'constrained',
    component: ConstrainedComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutExamplesRoutingModule {}
