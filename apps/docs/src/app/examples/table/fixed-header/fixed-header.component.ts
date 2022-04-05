import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-fixed-header',
  templateUrl: './fixed-header.component.html',
  styleUrls: ['./fixed-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FixedHeaderComponent {
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
}

export default FixedHeaderComponent;
