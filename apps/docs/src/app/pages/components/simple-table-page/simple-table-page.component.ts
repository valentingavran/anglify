import { CheckboxComponent, InputDirective, SimpleTableComponent, TextFieldComponent } from '@anglify/components';
import { NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { APIConfig, ComponentPageModule } from '../../../app.interface';

@Component({
  selector: 'app-simple-table-page',
  templateUrl: './simple-table-page.component.html',
  styleUrls: ['./simple-table-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [...ComponentPageModule, SimpleTableComponent, CheckboxComponent, FormsModule, TextFieldComponent, InputDirective, NgForOf],
})
export class SimpleTablePageComponent {
  public config: APIConfig = {
    components: ['SimpleTableComponent'],
  };

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
