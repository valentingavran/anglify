import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListGroupComponent {}
export default ListGroupComponent;
