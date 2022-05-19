import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialog-page.component.html',
  styleUrls: ['./dialog-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogPageComponent {}
