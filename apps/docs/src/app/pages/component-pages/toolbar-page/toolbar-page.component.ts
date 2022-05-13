import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-toolbar-page',
  templateUrl: './toolbar-page.component.html',
  styleUrls: ['./toolbar-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarPageComponent {}
