import type { DataTableHeader, DataTableItem } from '@anglify/components';
import { DataTableComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { items } from '../data';

@Component({
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './row-click.component.html',
  styleUrls: ['./row-click.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RowClickComponent {
  protected headers: DataTableHeader[] = [
    { text: 'Dessert (100g serving)', value: 'name' },
    { text: 'Calories', value: 'calories' },
    { text: 'Fat (g)', value: 'fat' },
    { text: 'Carbs (g)', value: 'carbs' },
    { text: 'Protein (g)', value: 'protein' },
    { text: 'Iron (%)', value: 'iron' },
  ];

  protected items = items;

  protected onItemClick(item: DataTableItem) {
    console.log(item);
  }
}
