import { BottomNavigationComponent, BottomNavigationItemComponent, IconComponent, SlotDirective } from '@anglify/components';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BottomNavigationComponent, BottomNavigationItemComponent, IconComponent, SlotDirective],
})
export default class ShiftComponent {}
