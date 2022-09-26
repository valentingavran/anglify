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
import { TrapFocusDirective } from 'libs/anglify/src/directives/trap-focus/trap-focus.directive';
import { BehaviorSubject, filter, fromEvent, Subject, takeUntil, tap } from 'rxjs';
import { focusableElementsString } from '../../../composables/position/position.interface';
import { SlotDirective } from '../../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../../directives/slot-outlet/slot-outlet.directive';
import { createSettingsProvider } from '../../../factories/settings.factory';
import { FindSlotPipe } from '../../../pipes/find-slot/find-slot.pipe';
import { bindObservableValueToNativeElement } from '../../../utils/functions';
import { DEFAULT_MENU_SETTINGS, MENU_SETTINGS } from '../menu-settings.token';
import { EntireMenuSettings } from '../menu.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-new-menu',
  standalone: true,
  imports: [NgIf, FindSlotPipe, SlotOutletDirective, AsyncPipe, TrapFocusDirective],
  templateUrl: './new-menu.component.html',
  styleUrls: ['./new-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireMenuSettings>('anglifyMenuSettings', DEFAULT_MENU_SETTINGS, MENU_SETTINGS)],
})
export class NewMenuComponent {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;

  @ViewChild('menu') private readonly menu?: ElementRef<HTMLElement>;

  @ViewChild('activator') private readonly activator?: ElementRef<HTMLElement>;

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

  @Input() public set disabled(value: boolean) {
    this.disabled$.next(value);
  }

  public get position() {
    return this.position$.value;
  }

  /**
   * Defines at which position the menu should be displayed.
   */
  @Input()
  public set position(value: Side) {
    this.position$.next(value);
  }

  public get trapFocus() {
    return this.trapFocus$.value;
  }

  @Input() public set trapFocus(value: boolean) {
    this.trapFocus$.next(value);
  }

  public get focusMenuWhenOpened() {
    return this.focusMenuWhenOpened$.value;
  }

  @Input() public set focusMenuWhenOpened(value: boolean) {
    this.focusMenuWhenOpened$.next(value);
  }

  public get focusable() {
    return this.focusable$.value;
  }

  @Input() public set focusable(value: boolean) {
    this.focusable$.next(value);
  }

  public get openOnHover() {
    return this.openOnHover$.value;
  }

  @Input() public set openOnHover(value: boolean) {
    this.openOnHover$.next(value);
  }

  public get closeOnOutsideClick() {
    return this.closeOnOutsideClick$.value;
  }

  @Input() public set closeOnOutsideClick(value: boolean) {
    this.closeOnOutsideClick$.next(value);
  }

  public get closeOnMenuClick() {
    return this.closeOnMenuClick$.value;
  }

  @Input() public set closeOnMenuClick(value: boolean) {
    this.closeOnMenuClick$.next(value);
  }

  protected readonly focusable$ = new BehaviorSubject(false);

  protected readonly activatorClicked$ = new Subject<void>();

  protected readonly value$ = new BehaviorSubject(false);

  protected readonly trapFocus$ = new BehaviorSubject(false);

  private readonly position$ = new BehaviorSubject(this.settings.position);

  private readonly menuClosed$ = this.value$.pipe(filter(value => !value));

  private readonly focusMenuWhenOpened$ = new BehaviorSubject(false);

  private readonly disabled$ = new BehaviorSubject(false);

  private readonly openOnHover$ = new BehaviorSubject(false);

  private readonly closeOnOutsideClick$ = new BehaviorSubject(true);

  private readonly closeOnMenuClick$ = new BehaviorSubject(true);

  public constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    @Self() @Inject('anglifyMenuSettings') private readonly settings: EntireMenuSettings
  ) {
    bindObservableValueToNativeElement(this, this.position$, this.elementRef.nativeElement);

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
    tap(value => {
      if (!value) {
        this.resetReposition();
        return; // ignore everything else from below on close
      }

      setTimeout(() => {
        if (!this.menu) return;
        this.repositionIfNecessary(this.menu.nativeElement);
        this.setupEscapeToClose(this.menu.nativeElement);
        this.setupClickToClose();

        if (this.focusMenuWhenOpened$.value) {
          const { firstFocusable } = this.getFirstAndLastFocusableElements(this.menu.nativeElement);
          if (firstFocusable) firstFocusable.focus();
          else this.menu.nativeElement.focus();
        }
      }, 0);
    }),
    tap(value => this.valueChange.emit(value))
  );

  private getFirstAndLastFocusableElements(parent: HTMLElement) {
    const focusableElements = parent.querySelectorAll(focusableElementsString) as NodeListOf<HTMLElement>;
    return {
      firstFocusable: focusableElements.length ? focusableElements[0] : null,
      lastFocusable: focusableElements.length ? focusableElements[focusableElements.length - 1] : null,
      allFocusableElements: focusableElements,
    };
  }

  private setupEscapeToClose(menu: HTMLElement) {
    fromEvent(menu, 'keydown')
      .pipe(untilDestroyed(this), takeUntil(this.menuClosed$))
      .subscribe(event => {
        if ((event as KeyboardEvent).key === 'Escape') {
          this.value$.next(false);
          if (!this.activator) return;
          this.getFirstAndLastFocusableElements(this.activator.nativeElement).firstFocusable?.focus();
        }
      });
  }

  private setupClickToClose() {
    fromEvent(document, 'click')
      .pipe(untilDestroyed(this), takeUntil(this.menuClosed$))
      .subscribe(event => {
        const target = event.target as HTMLElement;
        // Outside click
        if (!this.elementRef.nativeElement.contains(target) && this.closeOnOutsideClick$.value) {
          this.value$.next(false);
        }

        // Inside click
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
    // if menu outside of viewport, reposition

    const { top, height, left, right } = menu.getBoundingClientRect();
    const { innerHeight } = window;

    if (top + height > innerHeight) {
      const overflow = top + height - innerHeight;
      this.elementRef.nativeElement.style.setProperty('--anglify-menu-computed-vertical-offset', `-${overflow}px`);
    }

    if (top < 0) {
      this.elementRef.nativeElement.style.setProperty('--anglify-menu-computed-vertical-offset', `${-top}px`);
    }

    if (left < 0) {
      this.elementRef.nativeElement.style.setProperty('--anglify-menu-computed-horizontal-offset', `${-left}px`);
    }

    if (right > window.innerWidth) {
      const overflow = right - window.innerWidth;
      this.elementRef.nativeElement.style.setProperty('--anglify-menu-computed-horizontal-offset', `-${overflow}px`);
    }
  }

  private resetReposition() {
    this.elementRef.nativeElement.style.removeProperty('--anglify-menu-computed-horizontal-offset');
    this.elementRef.nativeElement.style.removeProperty('--anglify-menu-computed-vertical-offset');
  }
}
