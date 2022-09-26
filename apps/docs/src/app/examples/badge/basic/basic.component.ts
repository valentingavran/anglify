import { BadgeComponent, ButtonComponent, SlotDirective } from '@anglify/components';
import { SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeComponent, ButtonComponent, SlicePipe, SlotDirective],
})
export default class BasicComponent {}
