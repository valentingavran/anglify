import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from 'apps/docs/src/environments/environment';

@Component({
  selector: 'anglify-constrained',
  templateUrl: './constrained.component.html',
  styleUrls: ['./constrained.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConstrainedComponent {
  public openExampleCode() {
    window.open(environment.applicationLayoutsExampleURLs.constrained, '_blank');
  }
}
