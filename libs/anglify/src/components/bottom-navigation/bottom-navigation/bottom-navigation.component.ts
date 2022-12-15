import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  HostBinding,
  Inject,
  Input,
  Output,
  QueryList,
  Self,
  type AfterViewInit,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, filter, startWith, Subject, take, takeUntil, tap } from 'rxjs';
import { RIPPLE } from '../../../composables/ripple/ripple.provider';
import { createSettingsProvider } from '../../../factories/settings.factory';
import { BottomNavigationItemComponent } from '../bottom-navigation-item/bottom-navigation-item.component';
import { BOTTOM_NAVIGATION_SETTINGS, DEFAULT_BOTTOM_NAVIGATION_SETTINGS } from './bottom-navigation-settings.token';
import { EntireBottomNavigationSettings } from './bottom-navigation.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-bottom-navigation',
  standalone: true,
  templateUrl: './bottom-navigation.component.html',
  styleUrls: ['./bottom-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    createSettingsProvider<EntireBottomNavigationSettings>(
      'anglifyBottomNavigationSettings',
      DEFAULT_BOTTOM_NAVIGATION_SETTINGS,
      BOTTOM_NAVIGATION_SETTINGS
    ),
    RIPPLE,
  ],
})
export class BottomNavigationComponent implements AfterViewInit {
  @ContentChildren(BottomNavigationItemComponent) private readonly navigationItems?: QueryList<BottomNavigationItemComponent>;

  @Input() public grow = this.settings.grow;

  public get shift() {
    return this.shift$.value;
  }

  @Input() public set shift(value: boolean) {
    this.shift$.next(value);
  }

  @Input() public set value(value: number) {
    const item = this.items$.value[value] as BottomNavigationItemComponent | null | undefined;

    if (item) {
      this.selectItem(item);
    } else {
      /* It may happen that this setter is called before the slots have been loaded or any are present at all.
      As soon as the slots change, this method is called. */
      this.items$
        .pipe(
          untilDestroyed(this),
          filter(items => items.length > 0),
          take(1)
        )
        .subscribe(items => {
          const item1 = items[value] as BottomNavigationItemComponent | undefined;
          if (item1) this.selectItem(item1);
        });
    }
  }

  @Output() public readonly valueChange = new EventEmitter<number>();

  private readonly shift$ = new BehaviorSubject<boolean>(this.settings.shift);

  private readonly items$ = new BehaviorSubject<BottomNavigationItemComponent[]>([]);

  private readonly unsubscribeAll$ = new Subject<void>();

  private readonly destroySelectPreviousSubscription$ = new Subject<void>();

  private readonly destroySelectNextSubscription$ = new Subject<void>();

  public constructor(@Self() @Inject('anglifyBottomNavigationSettings') private readonly settings: EntireBottomNavigationSettings) {
    this.changeHandler$.pipe(untilDestroyed(this)).subscribe();

    this.items$.pipe(untilDestroyed(this)).subscribe(items => {
      for (const [index, item] of items.entries()) {
        // eslint-disable-next-line rxjs/no-unsafe-takeuntil, rxjs/no-nested-subscribe
        item.active$.pipe(untilDestroyed(this), takeUntil(this.unsubscribeAll$), filter(Boolean)).subscribe(() => {
          this.onSelectedItemChange(item, index);
        });
      }
    });
  }

  // @ts-expect-error: Value is used
  @HostBinding('attr.role') private readonly role = 'tablist';

  @HostBinding('class')
  protected get classList() {
    const classNames = [];
    if (this.grow) {
      classNames.push('grow');
    }

    return classNames.join(' ');
  }

  private readonly changeHandler$ = combineLatest([this.shift$, this.items$]).pipe(
    tap(([shift, items]) => {
      // eslint-disable-next-line sonarjs/no-ignored-return, no-restricted-globals
      items.map(item => setTimeout(() => (item.shift = shift), 0));
    })
  );

  private getActiveIndices() {
    return this.items$.value.findIndex(item => item.active);
  }

  private onSelectedItemChange(item: BottomNavigationItemComponent, index?: number) {
    this.deselectAllOthers(item);
    this.destroySelectPreviousSubscription$.next();

    item.onSelectPrevious.pipe(untilDestroyed(this), takeUntil(this.destroySelectPreviousSubscription$)).subscribe(() => {
      this.selectPrevious(item);
    });
    item.onSelectNext.pipe(untilDestroyed(this), takeUntil(this.destroySelectNextSubscription$)).subscribe(() => {
      this.selectNext(item);
    });

    if (index) this.valueChange.emit(index);
  }

  public ngAfterViewInit() {
    this.navigationItems!.changes.pipe(
      startWith(this.navigationItems),
      untilDestroyed(this),
      tap((items: BottomNavigationItemComponent[]) => {
        this.unsubscribeAll$.next();
        this.items$.next([...items]);
        for (const item of items) this.registerItemClickHandler(item);
      })
    ).subscribe();
  }

  private registerItemClickHandler(item: BottomNavigationItemComponent) {
    item.onClick
      .pipe(
        untilDestroyed(this),
        tap(() => this.selectItem(item))
      )
      .subscribe();
  }

  private selectItem(selectedItem: BottomNavigationItemComponent) {
    this.deselectAllOthers(selectedItem);
    selectedItem.active = true;
    this.valueChange.emit(this.getActiveIndices());
  }

  private deselectAllOthers(selectedItem: BottomNavigationItemComponent) {
    for (const item of this.items$.value) {
      if (item !== selectedItem) item.active = false;
    }
  }

  private selectPrevious(item: BottomNavigationItemComponent) {
    const index = this.items$.value.indexOf(item);
    if (index > 0) {
      const newItem = this.items$.value[index - 1];
      newItem.active = true;
      newItem.elementRef.nativeElement.focus();
    }
  }

  private selectNext(tab: BottomNavigationItemComponent) {
    const index = this.items$.value.indexOf(tab);
    if (index < this.items$.value.length - 1) {
      const newItem = this.items$.value[index + 1];
      newItem.active = true;
      newItem.elementRef.nativeElement.focus();
    }
  }
}
