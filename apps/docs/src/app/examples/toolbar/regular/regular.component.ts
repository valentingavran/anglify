import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anglify-regular',
  templateUrl: './regular.component.html',
  styleUrls: ['./regular.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegularComponent {}
export default RegularComponent;
