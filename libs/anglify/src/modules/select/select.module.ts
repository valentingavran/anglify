import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectComponent } from './select.component';
import { AnglifyCommonModule } from '../common/anglify-common.module';
import { IconModule } from '../icon/icon.module';
import { InputDirective } from '../input/input.directive';
import { InputModule } from '../input/input.module';
import { ListModule } from '../list/list.module';
import { MenuModule } from '../menu/menu.module';
import { TextFieldModule } from '../text-field/text-field.module';

@NgModule({
  declarations: [SelectComponent],
  imports: [CommonModule, AnglifyCommonModule, InputModule, TextFieldModule, IconModule, ListModule, MenuModule],
  exports: [SelectComponent, AnglifyCommonModule, InputDirective],
})
export class SelectModule {}
