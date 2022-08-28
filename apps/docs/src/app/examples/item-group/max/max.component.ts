import { ButtonComponent, CardComponent, IconComponent, ItemGroupComponent, SlotDirective } from '@anglify/components';
import { AsyncPipe, NgForOf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  standalone: true,
  templateUrl: './max.component.html',
  styleUrls: ['./max.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ItemGroupComponent, CardComponent, IconComponent, NgForOf, AsyncPipe, ButtonComponent, SlotDirective],
})
export default class MaxComponent {
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
