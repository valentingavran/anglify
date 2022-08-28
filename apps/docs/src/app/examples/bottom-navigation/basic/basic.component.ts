import { BottomNavigationComponent, BottomNavigationItemComponent, IconComponent, SlotDirective } from '@anglify/components';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,

  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BottomNavigationComponent, BottomNavigationItemComponent, IconComponent, SlotDirective],
})
export default class BasicComponent {}
