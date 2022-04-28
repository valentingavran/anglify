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
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import type { DrawerMode, NavDrawerSettings } from './nav-drawer.interface';
import { DEFAULT_NAV_DRAWER_SETTINGS, NAV_DRAWER_SETTINGS } from './nav-drawer.token';
import { createSettingsProvider } from '../../factories/settings.factory';
import { BooleanLike } from '../../utils/interfaces';
import { ListComponent } from '../list/components/list/list.component';

@UntilDestroy()
@Component({
  selector: 'anglify-nav-drawer',
  templateUrl: './nav-drawer.component.html',
  styleUrls: ['./nav-drawer.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NavDrawerComponent),
      multi: true,
    },
    createSettingsProvider<NavDrawerSettings>('anglifyNavDrawerSettings', DEFAULT_NAV_DRAWER_SETTINGS, NAV_DRAWER_SETTINGS),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavDrawerComponent implements AfterViewInit {
  @HostBinding('class.anglify-drawer-opened')
  public get opened() {
    return this.open;
  }

  @HostBinding('class.anglify-drawer-sticky')
  public get sticky() {
    return this.fixed;
  }

  @HostBinding('class')
  protected get classList() {
    const classNames = [this.mode];

    return classNames.join(' ');
  }

  @ContentChildren(ListComponent) public lists?: QueryList<ListComponent>;

  @Input()
  public mode: DrawerMode = this.settings.mode;

  @Input()
  public closeOnOutsideClick: BooleanLike = this.settings.closeOnOutsideClick;

  @Input()
  public closeOnItemClick: BooleanLike = this.settings.closeOnItemClick;

  @Input()
  public open = false;

  @Input()
  public fixed: BooleanLike = this.settings.fixed;

  public constructor(@Self() @Inject('anglifyNavDrawerSettings') private readonly settings: Required<NavDrawerSettings>) {}

  public ngAfterViewInit(): void {
    if (this.closeOnItemClick) {
      this.lists?.forEach(list => {
        list.onItemClick
          .asObservable()
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.setOpen(false);
          });
      });
    }
  }

  public toggle(isOpen = !this.open): void {
    this.setOpen(isOpen);
  }

  private setOpen(isOpen: boolean): void {
    this.open = isOpen;
  }

  public onBackdropClick(): void {
    if (this.closeOnOutsideClick) {
      this.setOpen(false);
    }
  }
}
