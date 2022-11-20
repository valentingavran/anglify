import { BottomNavigationComponent, BottomNavigationItemComponent, IconComponent, SlotDirective } from '@anglify/components';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './grow.component.html',
  styleUrls: ['./grow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BottomNavigationComponent, BottomNavigationItemComponent, IconComponent, SlotDirective],
})
export default class GrowComponent {
  protected value = 0;
}
