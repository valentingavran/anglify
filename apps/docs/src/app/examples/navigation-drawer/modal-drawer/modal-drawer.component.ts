import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-modal-drawer',
  templateUrl: './modal-drawer.component.html',
  styleUrls: ['./modal-drawer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalDrawerComponent {}

export default ModalDrawerComponent;
