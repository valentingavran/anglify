import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AutocompleteComponent } from './autocomplete.component';
import { ChipModule } from '../chip/chip.module';
import { AnglifyCommonModule } from '../common/anglify-common.module';
import { IconModule } from '../icon/icon.module';
import { InputDirective } from '../input/input.directive';
import { InputModule } from '../input/input.module';
import { ListModule } from '../list/list.module';
import { MenuModule } from '../menu/menu.module';
import { SelectModule } from '../select/select.module';
import { TextFieldModule } from '../text-field/text-field.module';

@NgModule({
  declarations: [AutocompleteComponent],
  imports: [CommonModule, AnglifyCommonModule, InputModule, SelectModule, TextFieldModule, IconModule, ListModule, MenuModule, ChipModule],
  exports: [AutocompleteComponent, AnglifyCommonModule, InputDirective],
})
export class AutocompleteModule {}
