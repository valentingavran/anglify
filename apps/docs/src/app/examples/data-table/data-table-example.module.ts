import { CheckboxModule, ChipModule, DataTableModule, TextFieldModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComplexDataComponent } from './complex-data/complex-data.component';
import { ExpandableRowsComponent } from './expandable-rows/expandable-rows.component';
import { FilterableComponent } from './filterable/filterable.component';
import { HeaderSlotComponent } from './header-slot/header-slot.component';
import { HideDefaultHeaderAndFooterComponent } from './hide-default-header-and-footer/hide-default-header-and-footer.component';
import { ItemSlotComponent } from './item-slot/item-slot.component';
import { MultiSortComponent } from './multi-sort/multi-sort.component';
import { SearchComponent } from './search/search.component';
import { SelectableRowsComponent } from './selectable-rows/selectable-rows.component';

@NgModule({
  declarations: [
    SearchComponent,
    FilterableComponent,
    MultiSortComponent,
    HeaderSlotComponent,
    ItemSlotComponent,
    ExpandableRowsComponent,
    HideDefaultHeaderAndFooterComponent,
    SelectableRowsComponent,
    ComplexDataComponent,
  ],
  imports: [CommonModule, DataTableModule, TextFieldModule, FormsModule, ChipModule, CheckboxModule],
})
export class DataTableExampleModule {}
