import { AsyncPipe, NgIf } from '@angular/common';
import {
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
  type AfterViewInit,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, filter, map } from 'rxjs';
import { createSettingsProvider } from '../../factories/settings.factory';
import { enterLeaveOpacityAnimation } from '../../utils/animations';
import { bindClassToNativeElement, bindObservableValueToNativeElement } from '../../utils/functions';
import { ListComponent } from '../list/components/list/list.component';
import { DEFAULT_NAVIGATION_DRAWER_SETTINGS, NAVIGATION_DRAWER_SETTINGS } from './navigation-drawer-settings.token';
import { EntireNavigationDrawerSettings, NavigationDrawerMode } from './navigation-drawer.interface';

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
  @ContentChildren(ListComponent) private readonly lists?: QueryList<ListComponent>;

  /**
   * Modal drawer will be closed on item clicks if this property is set.
   */
  @Input() public closeOnItemClick = this.settings.closeOnItemClick;

  public get mode() {
    return this.mode$.value;
  }

  /**
   * Changes the Navigation Drawer mode (modal or standard).
   */
  @Input() public set mode(value: NavigationDrawerMode) {
    this.mode$.next(value);
  }

  public get value() {
    return this.value$.value;
  }

  /**
   * Control whether the NavigationDrawer is opened or not.
   */
  @Input() public set value(value: boolean) {
    this.setOpened(value);
  }

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public readonly onValueChange = new EventEmitter();

  protected value$ = new BehaviorSubject(false);

  protected mode$ = new BehaviorSubject<NavigationDrawerMode>(this.settings.mode);

  public constructor(
    @Self() @Inject('anglifyNavigationDrawerSettings') private readonly settings: EntireNavigationDrawerSettings,
    private readonly elementRef: ElementRef<HTMLElement>
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
    if (this.lists)
      for (const list of this.lists) {
        list.onItemClick
          .asObservable()
          .pipe(
            filter(() => this.closeOnItemClick && this.mode$.value === 'modal'),
            untilDestroyed(this)
          )
          .subscribe(() => {
            this.setOpened(false);
          });
      }
  }
}
