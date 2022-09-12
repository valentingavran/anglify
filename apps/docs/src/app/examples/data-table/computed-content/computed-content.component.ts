import { DataTableComponent, type DataTableHeader } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { items, type FoodEntry } from '../data';

@Component({
  standalone: true,
  imports: [DataTableComponent],
  templateUrl: './computed-content.component.html',
  styleUrls: ['./computed-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ComputedContentComponent {
  public headers: DataTableHeader<FoodEntry>[] = [
    { text: 'Dessert (100g serving)', value: 'name' },
    { text: 'Calories', value: 'calories', computeContent: item => this.evaluateCalories(item.calories) },
    { text: 'Fat (g)', value: 'fat' },
    { text: 'Carbs (g)', value: 'carbs' },
    { text: 'Protein (g)', value: 'protein' },
    { text: 'Iron (%)', value: 'iron' },
  ];

  public items = items;

  private evaluateCalories(calories: number) {
    if (calories < 300) {
      return 'Few calories';
    } else if (calories < 400) {
      return 'Some calories';
    }

    return 'Many calories';
  }
}
