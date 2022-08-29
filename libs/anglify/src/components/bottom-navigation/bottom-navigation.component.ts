import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  forwardRef,
  HostBinding,
  Inject,
  Input,
  QueryList,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, filter, startWith, Subject, take, takeUntil, tap } from 'rxjs';
import { BOTTOM_NAVIGATION_SETTINGS, DEFAULT_BOTTOM_NAVIGATION_SETTINGS } from './bottom-navigation-settings.token';
import { EntireBottomNavigationSettings } from './bottom-navigation.interface';
import { BottomNavigationItemComponent } from './components/bottom-navigation-item/bottom-navigation-item.component';
import { RIPPLE } from '../../composables/ripple/ripple.provider';
import { createSettingsProvider } from '../../factories/settings.factory';

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
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BottomNavigationComponent),
      multi: true,
    },
  ],
})
export class BottomNavigationComponent implements ControlValueAccessor, AfterViewInit {
  @ContentChildren(BottomNavigationItemComponent) public readonly navigationItems?: QueryList<BottomNavigationItemComponent>;

  /** Force items to take up all available space. */
  @Input() public grow = this.settings.grow;

  /** Hides text of items when they are not active. */
  @Input() public set shift(value: boolean) {
    this.shift$.next(value);
  }

  public get shift() {
    return this.shift$.value;
  }

  private readonly shift$ = new BehaviorSubject<boolean>(this.settings.shift);
  private readonly items$ = new BehaviorSubject<BottomNavigationItemComponent[]>([]);
  private readonly unsubscribeAll = new Subject<void>();
  private readonly destroySelectPreviousSubscription = new Subject<void>();
  private readonly destroySelectNextSubscription = new Subject<void>();

  public constructor(@Self() @Inject('anglifyBottomNavigationSettings') public settings: EntireBottomNavigationSettings) {
    this.changeHandler$.pipe(untilDestroyed(this)).subscribe();

    this.items$.pipe(untilDestroyed(this)).subscribe(items => {
      items.forEach((item, index) => {
        item.active$.pipe(untilDestroyed(this), takeUntil(this.unsubscribeAll), filter(Boolean)).subscribe(() => {
          this.onSelectedItemChange(item, index);
        });
      });
    });
  }

  // @ts-expect-error
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
      items.map(item => setTimeout(() => (item.shift = shift), 0));
    })
  );

  public onChange: (...args: any[]) => void = () => {};
  public onTouch: (...args: any[]) => void = () => {};

  public registerOnChange(fn: (...args: any[]) => void) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: (...args: any[]) => void) {
    this.onTouch = fn;
  }

  private getActiveIndices(): number[] {
    return this.items$.value
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => item.active)
      .map(({ index }) => index);
  }

  public writeValue(value: number) {
    const item = this.items$.value[value] as BottomNavigationItemComponent | null | undefined;

    if (item) {
      this.selectItem(item);
    } else {
      /* It may happen that writeValue is called before the slots have been loaded or any are present at all.
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

  private onSelectedItemChange(item: BottomNavigationItemComponent, index?: number) {
    this.deselectAllOthers(item);
    this.destroySelectPreviousSubscription.next();

    item.onSelectPrevious.pipe(untilDestroyed(this), takeUntil(this.destroySelectPreviousSubscription)).subscribe(() => {
      this.selectPrevious(item);
    });
    item.onSelectNext.pipe(untilDestroyed(this), takeUntil(this.destroySelectNextSubscription)).subscribe(() => {
      this.selectNext(item);
    });

    if (index) this.onChange(index);
  }

  public ngAfterViewInit() {
    this.navigationItems!.changes.pipe(
      startWith(this.navigationItems),
      untilDestroyed(this),
      tap((items: BottomNavigationItemComponent[]) => {
        this.unsubscribeAll.next();
        this.items$.next([...items]);
        items.forEach(item => this.registerItemClickHandler(item));
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
    this.onChange(this.getActiveIndices());
  }

  private deselectAllOthers(selectedItem: BottomNavigationItemComponent) {
    this.items$.value.forEach(item => {
      if (item !== selectedItem) item.active = false;
    });
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
