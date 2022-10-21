import { SliderComponent } from '@anglify/components';
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SliderComponent],
})
export class BasicComponent {}
export default BasicComponent;
