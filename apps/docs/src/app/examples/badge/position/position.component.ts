import { BadgeDirective, ButtonComponent } from '@anglify/components';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeDirective, ButtonComponent],
})
export default class PositionComponent {}
