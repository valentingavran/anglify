import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstallationComponent } from './installation/installation.component';
import { LayoutsComponent } from './layouts/layouts.component';

const routes: Routes = [
  {
    path: 'installation',
    component: InstallationComponent,
  },
  {
    path: 'application-layouts',
    component: LayoutsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GettingStartedRoutingModule {}
