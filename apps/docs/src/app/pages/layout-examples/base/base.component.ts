import { BreakpointObserverService } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from 'apps/docs/src/environments/environment';

@Component({
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent {
  public constructor(public readonly breakpointService: BreakpointObserverService) {}

  public openExampleCode() {
    window.open(environment.applicationLayoutsExampleURLs.base, '_blank');
  }
}
