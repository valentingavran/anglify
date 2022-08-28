import { RadioButtonComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  templateUrl: './appearances.component.html',
  styleUrls: ['./appearances.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RadioButtonComponent, FormsModule],
})
export default class AppearancesComponent {
  public disabledInput = '2';
}
