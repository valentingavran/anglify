import { DataTableHeader } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { items } from '../data';

@Component({
  selector: 'anglify-expandable-rows',
  templateUrl: './expandable-rows.component.html',
  styleUrls: ['./expandable-rows.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpandableRowsComponent {
  public headers: DataTableHeader[] = [
    { text: 'Dessert (100g serving)', value: 'name' },
    { text: 'Calories', value: 'calories' },
    { text: 'Fat (g)', value: 'fat' },
    { text: 'Carbs (g)', value: 'carbs' },
    { text: 'Protein (g)', value: 'protein' },
    { text: 'Iron (%)', value: 'iron' },
  ];

  public items = items;
}

export default ExpandableRowsComponent;