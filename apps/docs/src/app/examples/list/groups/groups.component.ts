import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsComponent {}

export default GroupsComponent;
