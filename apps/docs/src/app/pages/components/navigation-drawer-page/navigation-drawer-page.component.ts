import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-navigation-drawer-page',
  templateUrl: './navigation-drawer-page.component.html',
  styleUrls: ['./navigation-drawer-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationDrawerPageComponent {}
