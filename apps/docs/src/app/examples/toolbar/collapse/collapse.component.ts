import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anglify-collapse',
  templateUrl: './collapse.component.html',
  styleUrls: ['./collapse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollapseComponent {}
export default CollapseComponent;
