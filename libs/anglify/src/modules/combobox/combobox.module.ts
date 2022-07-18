import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComboboxComponent } from './combobox.component';
import { AutocompleteModule } from '../autocomplete/autocomplete.module';
import { ChipModule } from '../chip/chip.module';
import { AnglifyCommonModule } from '../common/anglify-common.module';
import { IconModule } from '../icon/icon.module';
import { InputDirective } from '../input/input.directive';
import { InputModule } from '../input/input.module';
import { ListModule } from '../list/list.module';
import { MenuModule } from '../menu/menu.module';
import { TextFieldModule } from '../text-field/text-field.module';

@NgModule({
  declarations: [ComboboxComponent],
  imports: [
    CommonModule,
    AnglifyCommonModule,
    InputModule,
    AutocompleteModule,
    TextFieldModule,
    IconModule,
    ListModule,
    MenuModule,
    ChipModule,
  ],
  exports: [ComboboxComponent, AnglifyCommonModule, InputDirective],
})
export class ComboboxModule {}
