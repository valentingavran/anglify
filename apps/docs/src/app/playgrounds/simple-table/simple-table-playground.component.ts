import { CheckboxComponent, InputDirective, SimpleTableComponent, TextFieldComponent } from '@anglify/components';
import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [SimpleTableComponent, CheckboxComponent, TextFieldComponent, InputDirective, FormsModule, NgForOf],
  templateUrl: './simple-table-playground.component.html',
  styleUrls: ['./simple-table-playground.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleTablePlaygroundComponent {
  public fixedHeader = false;
  public fixedFooter = false;
  public _fixedHeight: string | null = null;

  public readonly desserts = [
    {
      name: 'Frozen Yogurt',
      calories: 159,
    },
    {
      name: 'Ice cream sandwich',
      calories: 237,
    },
    {
      name: 'Eclair',
      calories: 262,
    },
    {
      name: 'Cupcake',
      calories: 305,
    },
    {
      name: 'Gingerbread',
      calories: 356,
    },
    {
      name: 'Jelly bean',
      calories: 375,
    },
    {
      name: 'Lollipop',
      calories: 392,
    },
    {
      name: 'Honeycomb',
      calories: 408,
    },
    {
      name: 'Donut',
      calories: 452,
    },
    {
      name: 'KitKat',
      calories: 518,
    },
  ];

  public get fixedHeight() {
    return this._fixedHeight;
  }
}
