import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './stateless.component.html',
  styleUrls: ['./stateless.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatelessComponent {
  protected count = 1;

  protected decrease() {
    this.count--;
  }

  protected increase() {
    this.count++;
  }
}

export default StatelessComponent;
