import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  templateUrl: './complex.component.html',
  styleUrls: ['./complex.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplexComponent {}
export default ComplexComponent;
