import { ButtonComponent, IconComponent, SlotDirective, TabComponent, TabGroupComponent, ToolbarComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { environment } from 'apps/docs/src/environments/environment';

@Component({
  standalone: true,
  imports: [ToolbarComponent, SlotDirective, TabGroupComponent, TabComponent, ButtonComponent, IconComponent, RouterModule],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
  public openExampleCode() {
    window.open(environment.applicationLayoutsExampleURLs.tabs, '_blank');
  }
}
