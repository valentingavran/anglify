import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anglify-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicComponent {}
export default BasicComponent;
