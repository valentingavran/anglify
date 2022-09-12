import { CheckboxComponent, DataTableComponent, type DataTableHeader } from '@anglify/components';
import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { items } from '../data';

@Component({
  standalone: true,
  templateUrl: './selectable-rows.component.html',
  styleUrls: ['./selectable-rows.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DataTableComponent, CheckboxComponent, JsonPipe],
})
export default class SelectableRowsComponent {
  protected singleSelect = false;

  protected headers: DataTableHeader[] = [
    { text: 'Dessert (100g serving)', value: 'name' },
    { text: 'Calories', value: 'calories' },
    { text: 'Fat (g)', value: 'fat' },
    { text: 'Carbs (g)', value: 'carbs' },
    { text: 'Protein (g)', value: 'protein' },
    { text: 'Iron (%)', value: 'iron' },
  ];

  protected items = items;

  protected selection: any[] = [items[0]];
}
