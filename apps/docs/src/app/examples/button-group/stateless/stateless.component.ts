import { ButtonGroupComponent, ButtonGroupItemComponent, IconComponent } from '@anglify/components';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  templateUrl: './stateless.component.html',
  styleUrls: ['./stateless.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonGroupComponent, ButtonGroupItemComponent, IconComponent],
})
export default class StatelessComponent {
  protected count = 1;

  protected decrease() {
    this.count--;
  }

  protected increase() {
    this.count++;
  }
}
