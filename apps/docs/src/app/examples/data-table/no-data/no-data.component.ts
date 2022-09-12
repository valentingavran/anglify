import { DataTableComponent, type DataTableHeader, SlotDirective } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [DataTableComponent, SlotDirective],
  templateUrl: './no-data.component.html',
  styleUrls: ['./no-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NoDataComponent {
  public headers: DataTableHeader[] = [
    { text: 'Dessert (100g serving)', value: 'name' },
    { text: 'Calories', value: 'calories' },
    { text: 'Fat (g)', value: 'fat' },
    { text: 'Carbs (g)', value: 'carbs' },
    { text: 'Protein (g)', value: 'protein' },
    { text: 'Iron (%)', value: 'iron' },
  ];
}
