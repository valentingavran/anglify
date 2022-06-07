import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { DefaultComponent } from './layouts/default/default.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        redirectTo: 'getting-started/installation',
        pathMatch: 'full',
      },
      {
        path: 'getting-started',
        loadChildren: () => import('./pages/getting-started/getting-started.module').then(m => m.GettingStartedModule),
      },
      {
        path: 'features',
        loadChildren: () => import('./pages/features/features.module').then(m => m.FeaturesModule),
      },
      {
        path: 'components',
        loadChildren: () => import('./pages/components/components.module').then(m => m.ComponentsModule),
      },
    ],
  },
  {
    path: 'examples/layouts',
    component: BlankComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/layout-examples/layout-examples.module').then(m => m.LayoutExamplesModule),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
