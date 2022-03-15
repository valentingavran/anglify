import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './components/list/list.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { PrependDirective } from './directives/prepend/prepend.directive';
import { AppendDirective } from './directives/append/append.directive';
import { ListItemTitleComponent } from './components/list-item-title/list-item-title.component';
import { ListItemDescriptionComponent } from './components/list-item-description/list-item-description.component';

@NgModule({
  declarations: [ListComponent, ListItemComponent, PrependDirective, AppendDirective, ListItemTitleComponent, ListItemDescriptionComponent],
  imports: [CommonModule],
  exports: [ListComponent, ListItemComponent, PrependDirective, AppendDirective, ListItemTitleComponent, ListItemDescriptionComponent],
})
export class ListModule {}
