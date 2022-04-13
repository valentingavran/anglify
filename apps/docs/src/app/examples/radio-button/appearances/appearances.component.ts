import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-appearances',
  templateUrl: './appearances.component.html',
  styleUrls: ['./appearances.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppearancesComponent {
  public disabledInput = '2';
}

export default AppearancesComponent;
