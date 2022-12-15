import { AsyncPipe, NgIf } from '@angular/common';
import type { OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  createComponent,
  ElementRef,
  EnvironmentInjector,
  EventEmitter,
  Inject,
  Input,
  Output,
  QueryList,
  Self,
} from '@angular/core';
import { autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { distinctUntilChanged, fromEvent, map, merge, NEVER, of, switchMap, tap } from 'rxjs';
import { SlotDirective } from '../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../directives/slot-outlet/slot-outlet.directive';
import { TrapFocusDirective } from '../../directives/trap-focus/trap-focus.directive';
import { createSettingsProvider } from '../../factories/settings.factory';
import { FindSlotPipe } from '../../pipes/find-slot/find-slot.pipe';
import { getFirstAndLastFocusableElements } from '../../utils/functions';
import { Machine } from '../../utils/machine';
import { MenuContentComponent } from './menu-content/menu-content.component';
import { DEFAULT_MENU_SETTINGS, MENU_SETTINGS } from './menu-settings.token';
import { EntireMenuSettings } from './menu.interface';
import { createMenuMachineConfig, MenuAction } from './menu.machine';

@UntilDestroy()
@Component({
  selector: 'anglify-menu',
  standalone: true,
  imports: [NgIf, FindSlotPipe, SlotOutletDirective, AsyncPipe, TrapFocusDirective, MenuContentComponent],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireMenuSettings>('anglifyMenuSettings', DEFAULT_MENU_SETTINGS, MENU_SETTINGS)],
})
export class MenuComponent implements EntireMenuSettings, OnChanges, OnDestroy {
  @ContentChildren(SlotDirective) protected readonly slots?: QueryList<SlotDirective>;

  @Input() public shift = this.settings.shift;

  @Input() public offset = this.settings.offset;

  @Input() public flip = this.settings.flip;

  @Input() public focusActivatorOnClose = this.settings.focusActivatorOnClose;

  @Input() public disabled = this.settings.disabled;

  @Input() public position = this.settings.position;

  @Input() public maxWidth = this.settings.maxWidth;

  @Input() public maxHeight = this.settings.maxHeight;

  @Input() public openOnHover = this.settings.openOnHover;

  @Input() public closeOnEscape = this.settings.closeOnEscape;

  @Input() public closeOnMenuClick = this.settings.closeOnMenuClick;

  @Input() public closeOnOutsideClick = this.settings.closeOnOutsideClick;

  @Input() public value = this.settings.value;

  /**
   * Emits when the menu is opened or closed.
   */
  @Output() public readonly valueChange = new EventEmitter<boolean>();

  public menuContent = createComponent(MenuContentComponent, { environmentInjector: this.injector });

  private unsubscribeAutoUpdateFn: (() => void) | null = null;

  protected machine = new Machine(
    createMenuMachineConfig({
      focusFirstItem: () => this.menuContent.instance.focusFirstItem(),
      focusLastItem: () => this.menuContent.instance.focusLastItem(),
      focusNextItem: () => this.menuContent.instance.focusNextItem(),
      focusPreviousItem: () => this.menuContent.instance.focusPreviousItem(),
      ...this,
    })
  );

  public constructor(
    @Self() @Inject('anglifyMenuSettings') private readonly settings: EntireMenuSettings,
    public readonly elementRef: ElementRef<HTMLElement>,
    private readonly appRef: ApplicationRef,
    private readonly injector: EnvironmentInjector
  ) {
    this.handleOpening();
    this.bindMachineEvents();
  }

  public ngOnDestroy() {
    this.close();
  }

  public ngOnChanges(changes: SimpleChanges) {
    const context = this.machine.context$.value as any;
    for (const key of Object.keys(changes)) {
      if (context[key] !== changes[key].currentValue) {
        context[key] = changes[key].currentValue;
      }
    }

    this.machine.context$.next(context);
  }

  private bindMachineEvents() {
    merge(
      fromEvent(document, 'click').pipe(
        map(event => {
          if (this.elementRef.nativeElement.contains(event.target as Node)) {
            return MenuAction.ACTIVATOR_CLICK;
          }

          if (this.menuContent.location.nativeElement.contains(event.target as Node)) {
            return MenuAction.MENU_CLICK;
          }

          return MenuAction.OUTSIDE_CLICK;
        })
      ),
      fromEvent(document, 'mouseover').pipe(
        map(event => {
          if (
            this.elementRef.nativeElement.contains(event.target as Node) ||
            this.menuContent.location.nativeElement.contains(event.target as Node)
          ) {
            return MenuAction.MOUSE_OVER;
          }

          return MenuAction.MOUSE_LEAVE;
        })
      ),
      merge(
        fromEvent<KeyboardEvent>(this.elementRef.nativeElement, 'keydown'),
        fromEvent<KeyboardEvent>(this.menuContent.location.nativeElement, 'keydown')
      ).pipe(
        switchMap(event => {
          if (event.key === 'Enter') {
            event.preventDefault();
            return of(MenuAction.ENTER);
          }

          if (event.key === 'ArrowDown') {
            event.preventDefault();
            return of(MenuAction.ARROW_DOWN);
          }

          if (event.key === 'ArrowUp') {
            event.preventDefault();
            return of(MenuAction.ARROW_UP);
          }

          if (event.key === 'Escape') {
            event.preventDefault();
            return of(MenuAction.ESCAPE);
          }

          if (event.key === 'Tab') {
            return of(MenuAction.TAB);
          }

          return NEVER;
        })
      )
    )
      .pipe(
        tap(action => this.machine.next(action)),
        untilDestroyed(this)
      )
      .subscribe();
  }

  private handleOpening() {
    this.machine.context$
      .pipe(
        untilDestroyed(this),
        map(context => context.value),
        distinctUntilChanged(),
        tap(value => {
          if (value) this.open();
          else this.close();
          // neccesary to make sure that the menu is in the right state
          setTimeout(() => this.machine.next(value ? MenuAction.OPEN : MenuAction.CLOSE), 0);
        })
      )
      .subscribe();
  }

  private open() {
    document.body.append(this.menuContent.location.nativeElement);
    this.appRef.attachView(this.menuContent.hostView);
    this.menuContent.instance.slots = this.slots;
    this.menuContent.instance.minWidth = `${this.elementRef.nativeElement.offsetWidth}px`;
    this.menuContent.instance.maxHeight = this.maxHeight;
    this.menuContent.instance.maxWidth = this.maxWidth;
    setTimeout(() => {
      this.unsubscribeAutoUpdateFn = autoUpdate(
        this.elementRef.nativeElement,
        this.menuContent.location.nativeElement,
        this.updateMenuPosition(this.elementRef.nativeElement, this.menuContent.location.nativeElement)
      );
      this.valueChange.emit(true);
    }, 0);
  }

  private close() {
    this.appRef.detachView(this.menuContent.hostView);
    this.unsubscribeAutoUpdateFn?.();
    if (this.focusActivatorOnClose) getFirstAndLastFocusableElements(this.elementRef.nativeElement).firstFocusable?.focus();
    this.valueChange.emit(false);
  }

  private updateMenuPosition(activator: HTMLElement, menuContent: HTMLElement) {
    return async () => {
      const { x, y } = await computePosition(activator, menuContent, {
        strategy: 'fixed',
        placement: this.position,
        middleware: [...(this.shift ? [shift()] : []), ...(this.flip ? [flip()] : []), offset(this.offset)],
      });
      Object.assign(menuContent.style, { left: `${x}px`, top: `${y}px`, visibility: 'visible' });
    };
  }

  public scrollToHighlightedItem() {
    const highlightedItem = this.menuContent.location.nativeElement.querySelector('.highlight');
    if (!highlightedItem) return;
    highlightedItem.scrollIntoView({ block: 'nearest' });
  }
}
