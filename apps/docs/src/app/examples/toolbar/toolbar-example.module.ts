import { ButtonModule, IconModule, ToolbarModule } from '@anglify/components';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CollapseComponent } from './collapse/collapse.component';
import { ExtendedComponent } from './extended/extended.component';
import { RegularComponent } from './regular/regular.component';

@NgModule({
  declarations: [RegularComponent, ExtendedComponent, CollapseComponent],
  imports: [CommonModule, ToolbarModule, IconModule, ButtonModule],
})
export class ToolbarExampleModule {}
