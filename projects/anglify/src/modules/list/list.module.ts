import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OverlayModule } from '../overlay/overlay.module';
import { ListItemDescriptionComponent } from './components/list-item-description/list-item-description.component';
import { ListItemTitleComponent } from './components/list-item-title/list-item-title.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ListComponent } from './components/list/list.component';
import { AppendDirective } from './directives/append/append.directive';
import { PrependDirective } from './directives/prepend/prepend.directive';

@NgModule({
  declarations: [ListComponent, ListItemComponent, PrependDirective, AppendDirective, ListItemTitleComponent, ListItemDescriptionComponent],
  imports: [CommonModule, OverlayModule],
  exports: [
    ListComponent,
    ListItemComponent,
    PrependDirective,
    AppendDirective,
    ListItemTitleComponent,
    ListItemDescriptionComponent,
    OverlayModule,
  ],
})
export class ListModule {}
