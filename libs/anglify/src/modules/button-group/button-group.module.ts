import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonGroupItemComponent } from './components/button-group-item/button-group-item.component';
import { ButtonGroupComponent } from './components/button-group/button-group.component';
import { ItemGroupModule } from '../item-group/item-group.module';

@NgModule({
  declarations: [ButtonGroupComponent, ButtonGroupItemComponent],
  imports: [CommonModule, ItemGroupModule],
  exports: [ButtonGroupComponent, ButtonGroupItemComponent],
})
export class ButtonGroupModule {}
