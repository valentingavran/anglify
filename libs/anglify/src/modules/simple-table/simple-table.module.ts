import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SimpleTableComponent } from './simple-table.component';

@NgModule({
  imports: [CommonModule],
  declarations: [SimpleTableComponent],
  exports: [SimpleTableComponent],
})
export class SimpleTableModule {}
