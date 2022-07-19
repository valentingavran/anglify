import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  HostBinding,
  Inject,
  Input,
  QueryList,
  Self,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, startWith, tap } from 'rxjs';
import { BOTTOM_NAVIGATION_SETTINGS, DEFAULT_BOTTOM_NAVIGATION_SETTINGS } from './bottom-navigation-settings.token';
import { EntireBottomNavigationSettings } from './bottom-navigation.interface';
import { BottomNavigationItemComponent } from './components/bottom-navigation-item/bottom-navigation-item.component';
import { RIPPLE } from '../../composables/ripple/ripple.provider';
import { createSettingsProvider } from '../../factories/settings.factory';

@UntilDestroy()
@Component({
  selector: 'anglify-bottom-navigation',
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
  @ContentChildren(BottomNavigationItemComponent) public readonly navigationItems?: QueryList<BottomNavigationItemComponent>;

  @Input() public grow = this.settings.grow;

  @HostBinding('class')
  protected get classList() {
    const classNames = [];
    if (this.grow) {
      classNames.push('grow');
    }

    return classNames.join(' ');
  }

  @Input() public set shift(value: boolean) {
    this.shift$.next(value);
  }

  public get shift() {
    return this.shift$.value;
  }

  private readonly shift$ = new BehaviorSubject<boolean>(this.settings.shift);
  private readonly items$ = new BehaviorSubject<BottomNavigationItemComponent[]>([]);

  private readonly changeHandler$ = combineLatest([this.shift$, this.items$]).pipe(
    tap(([shift, items]) => {
      items.map(item => setTimeout(() => (item.shift = shift), 0));
    })
  );

  public constructor(@Self() @Inject('anglifyBottomNavigationSettings') public settings: EntireBottomNavigationSettings) {
    this.changeHandler$.pipe(untilDestroyed(this)).subscribe();
  }

  public ngAfterViewInit() {
    this.navigationItems!.changes.pipe(
      startWith(this.navigationItems),
      untilDestroyed(this),
      this.updateLocalItems(),
      // todo: destroy old subscriptions here
      tap((items: BottomNavigationItemComponent[]) => {
        items.forEach(item => this.registerItemClickHandler(item));
      })
    ).subscribe();
  }

  private updateLocalItems() {
    return tap((items: BottomNavigationItemComponent[]) => {
      this.items$.next([...items]);
    });
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
    this.navigationItems?.forEach(item => (item.active = false));
    selectedItem.active = true;
  }
}
