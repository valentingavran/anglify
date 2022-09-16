import type { DataTableHeader } from '@anglify/components';
import { ButtonComponent, IconComponent, SlotDirective, DataTableComponent, BreakpointObserverService } from '@anglify/components';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { items } from '../data';

@Component({
  standalone: true,
  imports: [DataTableComponent, AsyncPipe, SlotDirective, ButtonComponent, IconComponent],
  templateUrl: './columns-control.component.html',
  styleUrls: ['./columns-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ColumnsControlComponent {
  public constructor(protected readonly breakpointService: BreakpointObserverService) {}

  public headers: DataTableHeader[] = [
    { text: 'Dessert (100g serving)', value: 'name' },
    { text: 'Calories', value: 'calories', hidden: true },
    { text: 'Fat (g)', value: 'fat', hiddenOnMobile: true },
    { text: 'Carbs (g)', value: 'carbs', hiddenOnMobile: true },
    { text: 'Protein (g)', value: 'protein', hiddenOnMobile: true },
    { text: 'Iron (%)', value: 'iron', hiddenOnMobile: true },
  ];

  public items = items;
}
