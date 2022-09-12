import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, Inject, Input, QueryList, type AfterViewInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, map, startWith, Subject, takeUntil, tap } from 'rxjs';
import { SlotDirective } from '../../../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../../../directives/slot-outlet/slot-outlet.directive';
import { FindSlotPipe } from '../../../../pipes/find-slot/find-slot.pipe';
import { INTERNAL_ICONS } from '../../../../tokens/internal-icons.token';
import { fastInFastOutY, rotate } from '../../../../utils/animations';
import { IconComponent } from '../../../icon/icon.component';
import { InternalIconSetDefinition } from '../../../icon/icon.interface';
import { ListItemComponent } from '../list-item/list-item.component';

@UntilDestroy()
@Component({
  selector: 'anglify-list-group',
  standalone: true,
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [rotate(), fastInFastOutY()],
  imports: [ListItemComponent, IconComponent, NgIf, AsyncPipe, FindSlotPipe, SlotOutletDirective, SlotDirective],
})
export class ListGroupComponent implements AfterViewInit {
  @ContentChildren(SlotDirective) public readonly slots!: QueryList<SlotDirective>;

  @ContentChildren(ListItemComponent, { descendants: true }) public listItems?: QueryList<ListItemComponent>;

  @ContentChildren(ListGroupComponent) public listGroups?: QueryList<ListGroupComponent>;

  public get active() {
    return this.active$.value;
  }

  /**
   * Control if the group is open by default.
   */
  @Input() public set active(value: boolean) {
    this.active$.next(value);
  }

  /**
   * If an element that is not in the group gets selected, then the group will be closed
   * automatically by default. With this property this functionality can be deactivated. This will
   * keep the group open until the user closes it manually.
   */
  @Input() public disableGroupCollapse = false;

  public active$ = new BehaviorSubject<boolean>(false);

  public unsubscribeActiveListenersAction$ = new Subject<void>();

  public constructor(@Inject(INTERNAL_ICONS) public readonly internalIcons: InternalIconSetDefinition) {}

  public ngAfterViewInit() {
    this.listItems?.changes
      .pipe(
        untilDestroyed(this),
        startWith(this.listItems),
        map(items => items.toArray() as ListItemComponent[]),
        tap(items => {
          this.unsubscribeActiveListenersAction$.next();
          for (const item of items) {
            item.active$.pipe(untilDestroyed(this), takeUntil(this.unsubscribeActiveListenersAction$)).subscribe(() => {
              // eslint-disable-next-line no-restricted-globals
              setTimeout(() => {
                if (this.hasActiveListItems(items)) {
                  this.open();
                } else if (!this.disableGroupCollapse) {
                  this.close();
                }
              }, 0);
            });
          }
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
