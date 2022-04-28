import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavDrawerComponent } from './nav-drawer.component';

@NgModule({
  declarations: [NavDrawerComponent],
  imports: [CommonModule],
  exports: [NavDrawerComponent],
})
export class NavDrawerModule {}
