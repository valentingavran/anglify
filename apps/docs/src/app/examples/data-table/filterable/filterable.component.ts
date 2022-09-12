import { DataTableComponent, type DataTableHeader, InputDirective, TextFieldComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { items } from '../data';

@Component({
  standalone: true,
  templateUrl: './filterable.component.html',
  styleUrls: ['./filterable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DataTableComponent, TextFieldComponent, InputDirective, FormsModule],
})
export default class FilterableComponent {
  public search?: string;

  public headers: DataTableHeader[] = [
    { text: 'Dessert (100g serving)', value: 'name', filterable: false },
    { text: 'Calories', value: 'calories' },
    { text: 'Fat (g)', value: 'fat' },
    { text: 'Carbs (g)', value: 'carbs' },
    { text: 'Protein (g)', value: 'protein' },
    { text: 'Iron (%)', value: 'iron' },
  ];

  public items = items;
}
