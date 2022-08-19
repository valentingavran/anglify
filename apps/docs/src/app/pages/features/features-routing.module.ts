import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BreakpointsComponent } from './breakpoints/brakpoints.component';
import { IconFontsComponent } from './icon-fonts/icon-fonts.component';
import { ThemingComponent } from './theming/theming.component';

const routes: Routes = [
  {
    path: 'theming',
    component: ThemingComponent,
    title: 'Theming | Anglify',
  },
  {
    path: 'icon-fonts',
    component: IconFontsComponent,
    title: 'Icon Fonts | Anglify',
  },
  {
    path: 'breakpoints',
    component: BreakpointsComponent,
    title: 'Breakpoints | Anglify',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
