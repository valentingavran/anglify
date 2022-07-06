import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreakpointsComponent } from './breakpoints/brakpoints.component';
import { IconFontsComponent } from './icon-fonts/icon-fonts.component';
import { ThemingComponent } from './theming/theming.component';

const routes: Routes = [
  {
    path: 'theming',
    component: ThemingComponent,
  },
  {
    path: 'icon-fonts',
    component: IconFontsComponent,
  },
  {
    path: 'breakpoints',
    component: BreakpointsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
