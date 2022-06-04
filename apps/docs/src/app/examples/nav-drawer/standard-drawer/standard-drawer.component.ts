import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-standard-drawer',
  templateUrl: './standard-drawer.component.html',
  styleUrls: ['./standard-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandardDrawerComponent {}

export default StandardDrawerComponent;
