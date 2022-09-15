import type { DataTableHeader } from '@anglify/components';
import { BreakpointObserverService, DataTableComponent } from '@anglify/components';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { items } from '../data';

@Component({
  standalone: true,
  imports: [DataTableComponent, AsyncPipe],
  templateUrl: './mobile-mode.component.html',
  styleUrls: ['./mobile-mode.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MobileModeComponent {
  public constructor(protected readonly breakpointService: BreakpointObserverService) {}

  protected headers: DataTableHeader[] = [
    { text: 'Dessert (100g serving)', value: 'name' },
    { text: 'Calories', value: 'calories' },
    { text: 'Fat (g)', value: 'fat', hiddenOnMobile: true },
    { text: 'Carbs (g)', value: 'carbs', hiddenOnMobile: true },
    { text: 'Protein (g)', value: 'protein', hiddenOnMobile: true },
    { text: 'Iron (%)', value: 'iron', hiddenOnMobile: true },
  ];

  protected items = items;
}
