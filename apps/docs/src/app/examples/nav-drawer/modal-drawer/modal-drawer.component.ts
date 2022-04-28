import { NavDrawerComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-modal-drawer',
  templateUrl: './modal-drawer.component.html',
  styleUrls: ['./modal-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDrawerComponent {
  @ViewChild('drawer') public drawer!: NavDrawerComponent;

  public doSomething(): void {}
}

export default ModalDrawerComponent;
