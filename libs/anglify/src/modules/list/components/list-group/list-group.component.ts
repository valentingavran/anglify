import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter, tap } from 'rxjs';
import { toBoolean } from '../../../../utils/functions';
import { BooleanLike } from '../../../../utils/interfaces';
import { SlotDirective } from '../../../common/directives/slot/slot.directive';
import { ListItemComponent } from '../list-item/list-item.component';

@UntilDestroy()
@Component({
  selector: 'anglify-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('false', style({ transform: 'rotate(0)' })),
      state('true', style({ transform: 'rotate(180deg)' })),
      transition('1 => 0', animate('200ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
      transition('0 => 1', animate('200ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
    ]),
    trigger('fast-in-fast-out-y', [
      state('*', style({ 'overflow-y': 'hidden' })),
      state('void', style({ 'overflow-y': 'hidden' })),
      transition('* => void', [style({ height: '*' }), animate('200ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ height: 0 }))]),
      transition('void => *', [style({ height: '0' }), animate('200ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({ height: '*' }))]),
    ]),
  ],
})
export class ListGroupComponent {
  @ContentChildren(SlotDirective) public readonly slots!: QueryList<SlotDirective>;
  @ContentChildren(ListItemComponent, { descendants: true }) public listItems?: QueryList<ListItemComponent>;
  @ContentChildren(ListGroupComponent) public listGroups?: QueryList<ListGroupComponent>;

  @Input() public set active(value: BooleanLike) {
    this.active$.next(toBoolean(value));
  }

  public get active() {
    return this.active$.value;
  }

  public active$ = new BehaviorSubject<boolean>(false);

  public constructor() {
    this.childrenListGroupsCloseHandler$.pipe(untilDestroyed(this)).subscribe();
  }

  public open() {
    if (!this.active$.value) {
      this.active$.next(true);
    }
  }

  public close() {
    if (this.active$.value) {
      this.active$.next(false);
    }
  }

  public toggle() {
    this.active$.next(!this.active$.value);
  }

  private readonly childrenListGroupsCloseHandler$ = this.active$.pipe(
    filter(active => active), // on close
    tap(() =>
      this.listGroups?.forEach(group => {
        group.close();
      })
    )
  );
}
