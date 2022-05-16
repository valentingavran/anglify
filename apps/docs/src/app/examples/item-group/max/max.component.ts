import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  templateUrl: './max.component.html',
  styleUrls: ['./max.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaxComponent {
  public items$ = new BehaviorSubject([1, 2, 3, 4]);

  public removeItem() {
    this.items$.next(this.items$.value.slice(0, this.items$.value.length - 1));
  }

  public addItem() {
    this.items$.next([...this.items$.value, this.items$.value.length + 1]);
  }

  public trackByFn(index: number) {
    return index;
  }
}
export default MaxComponent;
