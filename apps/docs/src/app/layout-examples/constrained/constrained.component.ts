import {
  ButtonComponent,
  CardComponent,
  IconComponent,
  ListComponent,
  ListItemComponent,
  ListItemTitleComponent,
  SlotDirective,
  ToolbarComponent,
} from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from 'apps/docs/src/environments/environment';

@Component({
  selector: 'anglify-constrained',
  standalone: true,
  templateUrl: './constrained.component.html',
  styleUrls: ['./constrained.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ToolbarComponent,
    CardComponent,
    ListComponent,
    ListItemComponent,
    ListItemTitleComponent,
    IconComponent,
    ButtonComponent,
    SlotDirective,
  ],
})
export class ConstrainedComponent {
  public openExampleCode() {
    window.open(environment.applicationLayoutsExampleURLs.constrained, '_blank');
  }
}
