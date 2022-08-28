import {
  BreakpointObserverService,
  ButtonComponent,
  IconComponent,
  NavigationDrawerComponent,
  SlotDirective,
  ToolbarComponent,
} from '@anglify/components';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from 'apps/docs/src/environments/environment';

@Component({
  standalone: true,
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ToolbarComponent, IconComponent, NavigationDrawerComponent, AsyncPipe, ButtonComponent, SlotDirective],
})
export class BaseComponent {
  public constructor(public readonly breakpointService: BreakpointObserverService) {}

  public openExampleCode() {
    window.open(environment.applicationLayoutsExampleURLs.base, '_blank');
  }
}
