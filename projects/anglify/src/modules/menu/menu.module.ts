import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuDirective } from './menu.directive';
import { MenuComponent } from './components/menu/menu.component';

@NgModule({
  declarations: [MenuDirective, MenuComponent],
  imports: [CommonModule],
  exports: [MenuDirective],
})
export class MenuModule {}
