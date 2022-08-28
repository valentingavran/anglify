import { BadgeDirective, ButtonComponent } from '@anglify/components';
import { SlicePipe } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeDirective, ButtonComponent, SlicePipe],
})
export default class BasicComponent {}
