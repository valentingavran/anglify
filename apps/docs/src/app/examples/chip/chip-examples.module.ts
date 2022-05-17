import { ChipModule, IconModule, ItemGroupModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppearancesComponent } from './appearances/appearances.component';
import { FilterComponent } from './filter/filter.component';
import { GroupsComponent } from './groups/groups.component';
import { MandatoryComponent } from './mandatory/mandatory.component';
import { MultipleMandatoryComponent } from './multiple-mandatory/multiple-mandatory.component';
import { MultipleComponent } from './multiple/multiple.component';
import { SlotsComponent } from './slots/slots.component';

@NgModule({
  declarations: [
    AppearancesComponent,
    SlotsComponent,
    GroupsComponent,
    MandatoryComponent,
    MultipleComponent,
    FilterComponent,
    MultipleMandatoryComponent,
  ],
  imports: [CommonModule, ChipModule, IconModule, ItemGroupModule],
})
export class ChipExamplesModule {}
