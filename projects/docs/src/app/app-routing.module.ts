import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TextFieldPageComponent } from './pages/component-pages/text-field-page/text-field-page.component';
import { IconPageComponent } from './pages/component-pages/icon-page/icon-page.component';
import { TooltipPageComponent } from './pages/component-pages/tooltip-page/tooltip-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'components/icon',
    component: IconPageComponent,
  },
  {
    path: 'components/text-field',
    component: TextFieldPageComponent,
  },
  {
    path: 'components/tooltip',
    component: TooltipPageComponent,
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
