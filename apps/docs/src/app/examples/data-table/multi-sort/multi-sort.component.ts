import type { SortSetting } from '@anglify/components';
import { DataTableComponent, type DataTableHeader } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { items } from '../data';

@Component({
  standalone: true,
  templateUrl: './multi-sort.component.html',
  styleUrls: ['./multi-sort.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DataTableComponent],
})
export default class MultiSortComponent {
  public headers: DataTableHeader[] = [
    { text: 'Dessert (100g serving)', value: 'name' },
    { text: 'Calories', value: 'calories' },
    { text: 'Fat (g)', value: 'fat' },
    { text: 'Carbs (g)', value: 'carbs' },
    { text: 'Protein (g)', value: 'protein' },
    { text: 'Iron (%)', value: 'iron' },
  ];

  protected sortBy: SortSetting[] = [
    {
      direction: 'asc',
      value: 'name',
    },
  ];

  public items = items;
}
