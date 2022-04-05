import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuComponent } from './components/menu/menu.component';
import { MenuDirective } from './menu.directive';

@NgModule({
  declarations: [MenuDirective, MenuComponent],
  imports: [CommonModule],
  exports: [MenuDirective],
})
export class MenuModule {}
