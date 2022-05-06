import { CardModule, CheckboxModule, IconModule, ListModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import ActionsComponent from './actions/actions.component';
import { GroupsComponent } from './groups/groups.component';
import { ListGroupComponent } from './list-group/list-group.component';
import MandatoryComponent from './mandatory/mandatory.component';
import MultipleMandatoryComponent from './multiple-mandatory/multiple-mandatory.component';
import MultipleComponent from './multiple/multiple.component';

@NgModule({
  declarations: [GroupsComponent, MandatoryComponent, MultipleComponent, MultipleMandatoryComponent, ActionsComponent, ListGroupComponent],
  imports: [CommonModule, ListModule, IconModule, CheckboxModule, CardModule],
})
export class ListExamplesModule {}
