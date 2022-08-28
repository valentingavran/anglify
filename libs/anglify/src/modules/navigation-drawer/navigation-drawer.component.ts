import { AsyncPipe, NgIf } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  QueryList,
  Self,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter, map } from 'rxjs';
import { DEFAULT_NAVIGATION_DRAWER_SETTINGS, NAVIGATION_DRAWER_SETTINGS } from './navigation-drawer-settings.token';
import { EntireNavigationDrawerSettings, NavigationDrawerMode } from './navigation-drawer.interface';
import { createSettingsProvider } from '../../factories/settings.factory';
import { enterLeaveOpacityAnimation } from '../../utils/animations';
import { bindClassToNativeElement, bindObservableValueToNativeElement } from '../../utils/functions';
import { ListComponent } from '../list/components/list/list.component';

@UntilDestroy()
@Component({
  selector: 'anglify-navigation-drawer',
  standalone: true,
  templateUrl: './navigation-drawer.component.html',
  styleUrls: ['./navigation-drawer.component.scss'],
  providers: [
    createSettingsProvider<EntireNavigationDrawerSettings>(
      'anglifyNavigationDrawerSettings',
      DEFAULT_NAVIGATION_DRAWER_SETTINGS,
      NAVIGATION_DRAWER_SETTINGS
    ),
  ],
  animations: [
    enterLeaveOpacityAnimation(), // used for backdrop opacity transition
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIf, AsyncPipe],
})
export class NavigationDrawerComponent implements AfterViewInit {
  @ContentChildren(ListComponent) public lists?: QueryList<ListComponent>;

  /** Modal drawer will be closed on item clicks if this property is set. */
  @Input() public closeOnItemClick = this.settings.closeOnItemClick;

  /** Changes the Navigation Drawer mode (modal or standard). */
  @Input() public set mode(value: NavigationDrawerMode) {
    this.mode$.next(value);
  }

  public get mode() {
    return this.mode$.value;
  }

  /** Control whether the NavigationDrawer is opened or not. */
  @Input() public set value(value: boolean) {
    this.setOpened(value);
  }

  public get value() {
    return this.value$.value;
  }

  @Output() public readonly onValueChange = new EventEmitter();

  public value$ = new BehaviorSubject(false);
  public mode$ = new BehaviorSubject<NavigationDrawerMode>(this.settings.mode);

  public constructor(
    @Self() @Inject('anglifyNavigationDrawerSettings') private readonly settings: EntireNavigationDrawerSettings,
    public elementRef: ElementRef<HTMLElement>
  ) {
    bindObservableValueToNativeElement(this, this.mode$, this.elementRef.nativeElement, 'anglify-navigation-drawer-');
    bindClassToNativeElement(
      this,
      this.value$.pipe(map(value => !value)),
      this.elementRef.nativeElement,
      'anglify-navigation-drawer-closed'
    );
  }

  public ngAfterViewInit() {
    this.listItemClickHandler();
  }

  public toggle(isOpen = !this.value$.value) {
    this.setOpened(isOpen);
  }

  private setOpened(open: boolean) {
    this.value$.next(open);
    this.onValueChange.emit(open);
  }

  private listItemClickHandler() {
    this.lists?.forEach(list => {
      list.onItemClick
        .asObservable()
        .pipe(
          filter(() => this.closeOnItemClick && this.mode$.value === 'modal'),
          untilDestroyed(this)
        )
        .subscribe(() => {
          this.setOpened(false);
        });
    });
  }
}
