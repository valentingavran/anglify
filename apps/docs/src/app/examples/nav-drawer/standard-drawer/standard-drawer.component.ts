import { NavDrawerComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-standard-drawer',
  templateUrl: './standard-drawer.component.html',
  styleUrls: ['./standard-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandardDrawerComponent {
  @ViewChild('drawer') public drawer!: NavDrawerComponent;

  public doSomething(): void {}
}

export default StandardDrawerComponent;
