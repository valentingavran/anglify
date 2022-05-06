import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ListGroupComponent } from './components/list-group/list-group.component';
import { ListItemDescriptionComponent } from './components/list-item-description/list-item-description.component';
import { ListItemGroupComponent } from './components/list-item-group/list-item-group.component';
import { ListItemTitleComponent } from './components/list-item-title/list-item-title.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ListComponent } from './components/list/list.component';
import { AnglifyCommonModule } from '../common/anglify-common.module';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [
    ListComponent,
    ListItemComponent,
    ListItemTitleComponent,
    ListItemDescriptionComponent,
    ListItemGroupComponent,
    ListGroupComponent,
  ],
  imports: [AnglifyCommonModule, CommonModule, IconModule],
  exports: [
    AnglifyCommonModule,
    ListComponent,
    ListItemComponent,
    ListItemTitleComponent,
    ListItemDescriptionComponent,
    ListItemGroupComponent,
    ListGroupComponent,
  ],
})
export class ListModule {}
