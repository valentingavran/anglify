import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IconFontsComponent } from './icon-fonts/icon-fonts.component';
import { InstallationComponent } from './installation/installation.component';
import { ThemingComponent } from './theming/theming.component';

const routes: Routes = [
  {
    path: 'installation',
    component: InstallationComponent,
  },
  {
    path: 'theming',
    component: ThemingComponent,
  },
  {
    path: 'icon-fonts',
    component: IconFontsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GettingStartedRoutingModule {}
