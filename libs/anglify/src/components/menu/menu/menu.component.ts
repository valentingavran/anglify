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
  ViewChild,
} from '@angular/core';
import { Side } from '@floating-ui/dom';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {
  BehaviorSubject,
  combineLatest,
  distinctUntilChanged,
  filter,
  fromEvent,
  map,
  merge,
  pairwise,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { focusableElementsString } from '../../../composables/position/position.interface';
import { SlotDirective } from '../../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../../directives/slot-outlet/slot-outlet.directive';
import { TrapFocusDirective } from '../../../directives/trap-focus/trap-focus.directive';
import { createSettingsProvider } from '../../../factories/settings.factory';
import { FindSlotPipe } from '../../../pipes/find-slot/find-slot.pipe';
import { bindObservableValueToNativeElement } from '../../../utils/functions';
import { DEFAULT_MENU_SETTINGS, MENU_SETTINGS } from '../menu-settings.token';
import { EntireMenuSettings } from '../menu.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-menu',
  standalone: true,
  imports: [NgIf, FindSlotPipe, SlotOutletDirective, AsyncPipe, TrapFocusDirective],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireMenuSettings>('anglifyMenuSettings', DEFAULT_MENU_SETTINGS, MENU_SETTINGS)],
})
export class MenuComponent {
  @ContentChildren(SlotDirective) protected readonly slots?: QueryList<SlotDirective>;

  @ViewChild('menu') private readonly menu?: ElementRef<HTMLElement>;

  @ViewChild('activator') private readonly activator?: ElementRef<HTMLElement>;

  /**
   * Emits when the menu is opened or closed.
   */
  @Output() public readonly valueChange = new EventEmitter<boolean>();

  public get value() {
    return this.value$.value;
  }

  /**
   * Controls whether the component is visible or hidden.
   */
  @Input() public set value(value: boolean) {
    this.value$.next(value);
  }

  public get disabled() {
    return this.disabled$.value;
  }

  /**
   * Prevents the menu from opening when the user clicks the activator.
   */
  @Input() public set disabled(value: boolean) {
    this.disabled$.next(value);
  }

  public get position() {
    return this.userSetPosition$.value;
  }

  /**
   * Defines at which position the menu should be displayed.
   */
  @Input()
  public set position(value: Side) {
    this.userSetPosition$.next(value);
  }

  public get trapFocus() {
    return this.trapFocus$.value;
  }

  /**
   * Traps the focus inside the menu when it is opened. Pressing the escape key,
   * selecting an item and clicking outside the menu will close the menu.
   */
  @Input() public set trapFocus(value: boolean) {
    this.trapFocus$.next(value);
  }

  public get focusMenuWhenOpened() {
    return this.focusMenuWhenOpened$.value;
  }

  /**
   * Specify if activator should stay focused or if menu should be focused when opened.
   */
  @Input() public set focusMenuWhenOpened(value: boolean) {
    this.focusMenuWhenOpened$.next(value);
  }

  public get focusable() {
    return this.focusable$.value;
  }

  /**
   * Specify if menu is focusable when opened.
   */
  @Input() public set focusable(value: boolean) {
    this.focusable$.next(value);
  }

  public get openOnHover() {
    return this.openOnHover$.value;
  }

  /**
   * Opens menu when activator is hovered.
   */
  @Input() public set openOnHover(value: boolean) {
    this.openOnHover$.next(value);
  }

  public get closeOnOutsideClick() {
    return this.closeOnOutsideClick$.value;
  }

  /**
   * With this enabled, the menu will be closed when the user clicks outside of it.
   */
  @Input() public set closeOnOutsideClick(value: boolean) {
    this.closeOnOutsideClick$.next(value);
  }

  public get closeOnMenuClick() {
    return this.closeOnMenuClick$.value;
  }

  /**
   * With this enabled, the menu will be closed when the user clicks inside of it.
   */
  @Input() public set closeOnMenuClick(value: boolean) {
    this.closeOnMenuClick$.next(value);
  }

  public get closeOnEscape() {
    return this.closeOnEscape$.value;
  }

  /**
   * With this enabled, the menu will be closed when the user presses the escape key.
   */
  @Input() public set closeOnEscape(value: boolean) {
    this.closeOnEscape$.next(value);
  }

  public get flip() {
    return this.closeOnEscape$.value;
  }

  /**
   * If there is not enough space to display the menu on the specified side, it will be flipped to the opposite side.
   */
  @Input() public set flip(value: boolean) {
    this.flip$.next(value);
  }

  @Input() public focusActivatorOnClose = true;

  protected readonly activatorClicked$ = new Subject<void>();

  protected readonly focusable$ = new BehaviorSubject(this.settings.focusable);

  protected readonly value$ = new BehaviorSubject(this.settings.value);

  protected readonly trapFocus$ = new BehaviorSubject(this.settings.trapFocus);

  private readonly focusMenuWhenOpened$ = new BehaviorSubject(this.settings.focusMenuWhenOpened);

  private readonly disabled$ = new BehaviorSubject(this.settings.disabled);

  private readonly openOnHover$ = new BehaviorSubject(this.settings.openOnHover);

  private readonly closeOnOutsideClick$ = new BehaviorSubject(this.settings.closeOnOutsideClick);

  private readonly closeOnMenuClick$ = new BehaviorSubject(this.settings.closeOnMenuClick);

  private readonly closeOnEscape$ = new BehaviorSubject(this.settings.closeOnEscape);

  private readonly flip$ = new BehaviorSubject(this.settings.flip);

  private readonly userSetPosition$ = new BehaviorSubject(this.settings.position);

  private readonly positionOverride$ = new BehaviorSubject<Side | null>(null);

  private readonly actualPosition$ = combineLatest([this.userSetPosition$, this.positionOverride$]).pipe(
    map(([userSet, override]) => override ?? userSet)
  );

  private readonly menuClosed$ = this.value$.pipe(filter(value => !value));

  public constructor(
    public readonly elementRef: ElementRef<HTMLElement>,
    @Self() @Inject('anglifyMenuSettings') private readonly settings: EntireMenuSettings
  ) {
    bindObservableValueToNativeElement(this, this.actualPosition$, this.elementRef.nativeElement);

    this.activatorInteractionHandler$.pipe(untilDestroyed(this)).subscribe();

    fromEvent(this.elementRef.nativeElement, 'mouseover')
      .pipe(
        untilDestroyed(this),
        filter(() => this.openOnHover$.value),
        tap(() => this.value$.next(true))
      )
      .subscribe();

    fromEvent(this.elementRef.nativeElement, 'mouseleave')
      .pipe(
        untilDestroyed(this),
        filter(() => this.openOnHover$.value),
        tap(() => this.value$.next(false))
      )
      .subscribe();

    this.valueChangeHandler$.pipe(untilDestroyed(this)).subscribe();
  }

  private readonly activatorInteractionHandler$ = this.activatorClicked$.pipe(
    filter(() => !this.openOnHover$.value),
    filter(() => !this.disabled$.value),
    tap(() => this.value$.next(!this.value$.value))
  );

  private readonly valueChangeHandler$ = this.value$.pipe(
    untilDestroyed(this),
    distinctUntilChanged(),
    pairwise(),
    tap(([prevValue, currentValue]) => {
      setTimeout(() => {
        if (!currentValue && prevValue) {
          this.focusActivator();
          this.resetReposition();
          return; // ignore everything else from below on close
        }

        if (!this.menu) return;
        this.repositionIfNecessary(this.menu.nativeElement);
        this.setupClickToClose();

        if (this.focusMenuWhenOpened$.value) {
          const { firstFocusable } = this.getFirstAndLastFocusableElements(this.menu.nativeElement);
          if (firstFocusable) firstFocusable.focus();
          else this.menu.nativeElement.focus();
        }
      }, 0);
    }),
    tap(([, currentValue]) => this.valueChange.emit(currentValue))
  );

  private getFirstAndLastFocusableElements(parent: HTMLElement) {
    const focusableElements = parent.querySelectorAll(focusableElementsString) as NodeListOf<HTMLElement>;
    return {
      firstFocusable: focusableElements.length ? focusableElements[0] : null,
      lastFocusable: focusableElements.length ? focusableElements[focusableElements.length - 1] : null,
      allFocusableElements: focusableElements,
    };
  }

  private focusActivator() {
    if (!this.activator) return;
    if (!this.focusActivatorOnClose) return;
    this.getFirstAndLastFocusableElements(this.activator.nativeElement).firstFocusable?.focus();
  }

  private setupClickToClose() {
    merge(
      fromEvent(document, 'click'),
      fromEvent(this.menu!.nativeElement, 'keydown').pipe(
        map(event => event as KeyboardEvent),
        filter(event => event.key === 'Enter' || event.key === 'Escape')
      )
    )
      .pipe(untilDestroyed(this), takeUntil(this.menuClosed$))
      .subscribe(event => {
        const target = event.target as HTMLElement;

        if (event instanceof KeyboardEvent && event.key === 'Escape' && this.closeOnEscape$.value) {
          this.value$.next(false);
          return;
        }

        // Outside click/enter
        if (!this.elementRef.nativeElement.contains(target) && this.closeOnOutsideClick$.value) {
          this.value$.next(false);
          return;
        }

        // Inside click/enter
        if (
          (!this.openOnHover$.value && this.elementRef.nativeElement.contains(target) && this.closeOnMenuClick$.value) ||
          (this.openOnHover$.value &&
            !this.activator?.nativeElement.contains(target) &&
            this.elementRef.nativeElement.contains(target) &&
            this.closeOnMenuClick$.value)
        ) {
          this.value$.next(false);
        }
      });
  }

  private repositionIfNecessary(menu: HTMLElement) {
    const { top, height, left, right } = menu.getBoundingClientRect();
    const { innerHeight } = window;

    let positionOverride: Side | null = null;

    if (top + height > innerHeight) {
      // menu overflows bottom of viewport

      if (this.flip$.value) {
        positionOverride = 'top';
      } else {
        const overflow = top + height - innerHeight;
        this.elementRef.nativeElement.style.setProperty('--anglify-menu-computed-vertical-offset', `-${overflow}px`);
      }
    }

    if (top < 0) {
      // menu overflows top of viewport

      if (this.flip$.value) {
        positionOverride = 'bottom';
      } else {
        this.elementRef.nativeElement.style.setProperty('--anglify-menu-computed-vertical-offset', `${-top}px`);
      }
    }

    if (left < 0) {
      // menu overflows left of viewport
      if (this.flip$.value) {
        positionOverride = 'right';
      } else {
        this.elementRef.nativeElement.style.setProperty('--anglify-menu-computed-horizontal-offset', `${-left}px`);
      }
    }

    if (right > window.innerWidth) {
      // menu overflows right of viewport

      if (this.flip$.value) {
        positionOverride = 'left';
      } else {
        const overflow = right - window.innerWidth;
        this.elementRef.nativeElement.style.setProperty('--anglify-menu-computed-horizontal-offset', `-${overflow}px`);
      }
    }

    if (positionOverride) this.positionOverride$.next(positionOverride);
  }

  private resetReposition() {
    this.elementRef.nativeElement.style.removeProperty('--anglify-menu-computed-horizontal-offset');
    this.elementRef.nativeElement.style.removeProperty('--anglify-menu-computed-vertical-offset');
    this.positionOverride$.next(null);
  }

  public scrollToHighlightedItem() {
    const highlightedItem = this.menu?.nativeElement.querySelector('.highlight');
    if (!highlightedItem) return;
    highlightedItem.scrollIntoView({ block: 'nearest' });
  }
}
