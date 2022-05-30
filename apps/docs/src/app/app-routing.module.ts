import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
    path: 'components',
    loadChildren: () => import('./pages/components/components.module').then(m => m.ComponentsModule),
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
