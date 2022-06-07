import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavigationDrawerComponent } from './navigation-drawer.component';

@NgModule({
  declarations: [NavigationDrawerComponent],
  imports: [CommonModule],
  exports: [NavigationDrawerComponent],
})
export class NavigationDrawerModule {}
