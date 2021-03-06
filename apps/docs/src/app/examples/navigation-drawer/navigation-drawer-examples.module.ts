import { ButtonModule, CardModule, IconModule, ListModule, NavigationDrawerModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import ModalDrawerComponent from './modal-drawer/modal-drawer.component';
import StandardDrawerComponent from './standard-drawer/standard-drawer.component';

@NgModule({
  imports: [CommonModule, NavigationDrawerModule, ButtonModule, ListModule, IconModule, CardModule],
  declarations: [StandardDrawerComponent, ModalDrawerComponent],
})
export class NavigationDrawerExamplesModule {}
