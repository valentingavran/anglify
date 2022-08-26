import { DataTableHeader } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { items } from '../data';

@Component({
  selector: 'anglify-selectable-rows',
  templateUrl: './selectable-rows.component.html',
  styleUrls: ['./selectable-rows.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectableRowsComponent {
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

  protected selection: Array<any> = [items[0]];
}
export default SelectableRowsComponent;
