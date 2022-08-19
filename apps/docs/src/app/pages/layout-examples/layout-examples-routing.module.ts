import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';
import { ConstrainedComponent } from './constrained/constrained.component';

const routes: Routes = [
  {
    path: 'base',
    component: BaseComponent,
    title: 'Base Layout Example | Anglify',
  },
  {
    path: 'constrained',
    component: ConstrainedComponent,
    title: 'Constrained Layout Example | Anglify',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutExamplesRoutingModule {}
