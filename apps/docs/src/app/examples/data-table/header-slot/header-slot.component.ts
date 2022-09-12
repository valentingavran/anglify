import { DataTableComponent, type DataTableHeader, SlotDirective } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { items } from '../data';

@Component({
  standalone: true,
  templateUrl: './header-slot.component.html',
  styleUrls: ['./header-slot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DataTableComponent, SlotDirective],
})
export default class HeaderSlotComponent {
  public headers: DataTableHeader[] = [
    { text: 'Dessert (100g serving)', value: 'name', width: 'auto' },
    { text: 'Calories', value: 'calories' },
    { text: 'Fat (g)', value: 'fat' },
    { text: 'Carbs (g)', value: 'carbs' },
    { text: 'Protein (g)', value: 'protein' },
    { text: 'Iron (%)', value: 'iron' },
  ];

  public items = items;
}
