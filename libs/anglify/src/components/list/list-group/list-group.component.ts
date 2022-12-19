import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, Inject, Input, QueryList, Self, type AfterViewInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, map, startWith, Subject, takeUntil, tap } from 'rxjs';
import { SlotDirective } from '../../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../../directives/slot-outlet/slot-outlet.directive';
import { createSettingsProvider } from '../../../factories/settings.factory';
import { FindSlotPipe } from '../../../pipes/find-slot/find-slot.pipe';
import { INTERNAL_ICONS } from '../../../tokens/internal-icons.token';
import { fastInFastOutY, rotate } from '../../../utils/animations';
import { IconComponent } from '../../icon/icon.component';
import { InternalIconSetDefinition } from '../../icon/icon.interface';
import { ListItemComponent } from '../list-item/list-item.component';
import { DEFAULT_LIST_GROUP_SETTINGS, LIST_GROUP_SETTINGS } from './list-group-settings.token';
import { EntireListGroupSettings } from './list-group.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-list-group',
  standalone: true,
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [rotate(), fastInFastOutY()],
  imports: [ListItemComponent, IconComponent, NgIf, AsyncPipe, FindSlotPipe, SlotOutletDirective, SlotDirective],
  providers: [
    createSettingsProvider<EntireListGroupSettings>('anglifyListGroupSettings', DEFAULT_LIST_GROUP_SETTINGS, LIST_GROUP_SETTINGS),
  ],
})
export class ListGroupComponent implements EntireListGroupSettings, AfterViewInit {
  @ContentChildren(SlotDirective) protected readonly slots!: QueryList<SlotDirective>;

  @ContentChildren(ListItemComponent, { descendants: true }) private readonly listItems?: QueryList<ListItemComponent>;

  @ContentChildren(ListGroupComponent) protected readonly listGroups?: QueryList<ListGroupComponent>;

  public get active() {
    return this.active$.value;
  }

  @Input() public set active(value: boolean) {
    this.active$.next(value);
  }

  @Input() public disableGroupCollapse = this.settings.disableGroupCollapse;

  protected active$ = new BehaviorSubject(this.settings.active);

  private unsubscribeActiveListenersAction$ = new Subject<void>();

  public constructor(
    @Self() @Inject('anglifyListGroupSettings') private readonly settings: EntireListGroupSettings,
    @Inject(INTERNAL_ICONS) protected readonly internalIcons: InternalIconSetDefinition
  ) {}

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
