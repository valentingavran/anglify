import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-nav-drawer-page',
  templateUrl: './nav-drawer-page.component.html',
  styleUrls: ['./nav-drawer-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavDrawerPageComponent {}
