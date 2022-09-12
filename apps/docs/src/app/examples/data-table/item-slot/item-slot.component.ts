import { ChipComponent, DataTableComponent, type DataTableHeader, SlotDirective } from '@anglify/components';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { items } from '../data';

@Component({
  standalone: true,
  templateUrl: './item-slot.component.html',
  styleUrls: ['./item-slot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DataTableComponent, ChipComponent, NgClass, SlotDirective],
})
export default class ItemSlotComponent {
  public headers: DataTableHeader[] = [
    { text: 'Dessert (100g serving)', value: 'name', width: 'auto' },
    { text: 'Calories', value: 'calories' },
    { text: 'Fat (g)', value: 'fat' },
    { text: 'Carbs (g)', value: 'carbs' },
    { text: 'Protein (g)', value: 'protein' },
    { text: 'Iron (%)', value: 'iron' },
  ];

  public items = items;

  public getColor(calories: number) {
    if (calories < 300) {
      return 'color-green';
    } else if (calories < 400) {
      return 'color-orange';
    }

    return 'color-red';
  }
}
