import { AfterViewInit, ChangeDetectionStrategy, Component, ContentChildren, Inject, Input, QueryList } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, map, startWith, Subject, takeUntil, tap } from 'rxjs';
import { INTERNAL_ICONS } from '../../../../tokens/internal-icons.token';
import { fastInFastOutY, rotate } from '../../../../utils/animations';

import { SlotDirective } from '../../../common/directives/slot/slot.directive';
import { InternalIconSetDefinition } from '../../../icon/icon.interface';
import { ListItemComponent } from '../list-item/list-item.component';

@UntilDestroy()
@Component({
  selector: 'anglify-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [rotate(), fastInFastOutY()],
})
export class ListGroupComponent implements AfterViewInit {
  @ContentChildren(SlotDirective) public readonly slots!: QueryList<SlotDirective>;
  @ContentChildren(ListItemComponent, { descendants: true }) public listItems?: QueryList<ListItemComponent>;
  @ContentChildren(ListGroupComponent) public listGroups?: QueryList<ListGroupComponent>;

  /** Control if the group is open by default. */
  @Input() public set active(value: boolean) {
    this.active$.next(value);
  }

  public get active() {
    return this.active$.value;
  }

  public active$ = new BehaviorSubject<boolean>(false);
  public unsubscribeActiveListenersAction = new Subject<void>();

  public constructor(@Inject(INTERNAL_ICONS) public readonly internalIcons: InternalIconSetDefinition) {}

  public ngAfterViewInit() {
    this.listItems?.changes
      .pipe(
        untilDestroyed(this),
        startWith(this.listItems),
        map(items => items as ListItemComponent[]),
        tap(items => {
          this.unsubscribeActiveListenersAction.next();
          items.forEach(item => {
            item.active$.pipe(untilDestroyed(this), takeUntil(this.unsubscribeActiveListenersAction)).subscribe(() => {
              setTimeout(() => {
                this.hasActiveListItems(items) ? this.open() : this.close();
              }, 0);
            });
          });
        })
      )
      .subscribe();
  }

  /**
   * @returns true if an active list item is found inside this list group
   */
  private hasActiveListItems(items: ListItemComponent[]) {
    return items.some(x => x.active);
  }

  public open() {
    if (!this.active$.value) this.active$.next(true);
  }

  public close() {
    if (this.active$.value) this.active$.next(false);
  }

  public toggle() {
    this.active$.next(!this.active$.value);
  }
}
