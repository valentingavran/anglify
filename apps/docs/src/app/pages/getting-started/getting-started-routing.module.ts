import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReleaseNotesComponent } from './changelog/release-notes.component';
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
  {
    path: 'release-notes',
    component: ReleaseNotesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GettingStartedRoutingModule {}
