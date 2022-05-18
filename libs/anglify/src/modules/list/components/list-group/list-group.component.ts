import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filterEmpty } from 'libs/anglify/src/utils/operator-functions';
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

  @Input() public disableGroupCollapse: BooleanLike = false;

  @Input() public set active(value: BooleanLike) {
    this.active$.next(toBoolean(value));
  }

  public get active() {
    return this.active$.value;
  }

  public active$ = new BehaviorSubject<boolean>(false);

  public constructor(private readonly router: Router) {
    this.childrenListGroupsCloseHandler$.pipe(untilDestroyed(this)).subscribe();

    this.router.events
      .pipe(
        untilDestroyed(this),
        filter(() => this.groupHasLinkItems()), // only continue if group has link items
        filter(event => event instanceof NavigationEnd),
        filterEmpty(),
        tap(link => {
          const url = (link as NavigationEnd).url.split('?')[0];
          const foundItems = this.findListItems(url);

          if (foundItems.length > 0) {
            this.open();
          } else if (foundItems.length === 0 && !this.disableGroupCollapse) {
            this.close();
          }
        })
      )
      .subscribe();
  }

  /**
   * @returns true if a list item is found with a routerLink that matches the current URL
   */
  private findListItems(currentURL: string) {
    return this.listItems
      ? this.listItems.filter(
          x =>
            x.routerLink !== undefined &&
            x.routerLink !== null &&
            (x.routerLink.length > 0 || typeof x.routerLink === 'string') &&
            this.checkRouterLink(x.routerLink, currentURL)
        )
      : [];
  }

  /**
   * @returns true if routerLink matches currentURL
   */
  private checkRouterLink(routerLink: string | any[], currentURL: string) {
    const link = typeof routerLink === 'string' ? `/${routerLink}` : `/${routerLink.join('/')}`;
    return link === currentURL;
  }

  /**
   * @returns true if the group has at least one list item with a routerLink
   */
  private groupHasLinkItems() {
    return this.listItems ? this.listItems.some(x => x.routerLink !== undefined && x.routerLink !== null) : false;
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
