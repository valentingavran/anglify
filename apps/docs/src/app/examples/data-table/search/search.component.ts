import { DataTableComponent, type DataTableHeader, InputDirective, TextFieldComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { items } from '../data';

@Component({
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DataTableComponent, TextFieldComponent, InputDirective, FormsModule],
})
export default class SearchComponent {
  public search?: string;

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
