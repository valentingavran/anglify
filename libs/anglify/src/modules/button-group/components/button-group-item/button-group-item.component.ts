import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Host, HostListener, Inject, Input, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, map, merge, tap } from 'rxjs';
import { RIPPLE } from '../../../../composables/ripple/ripple.provider';
import { RippleService } from '../../../../composables/ripple/ripple.service';
import { createSettingsProvider } from '../../../../factories/settings.factory';
import { bindAttrToNativeElement, bindClassToNativeElement } from '../../../../utils/functions';
import { BUTTON_GROUP_SETTINGS, DEFAULT_BUTTON_GROUP_SETTINGS } from '../../button-group-settings.token';
import { EntireButtonGroupSettings } from '../../button-group.interface';

@UntilDestroy()
@Component({
  selector: 'button[anglifyButtonGroupItem]',
  standalone: true,
  templateUrl: './button-group-item.component.html',
  styleUrls: ['./button-group-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    RIPPLE,
    createSettingsProvider<EntireButtonGroupSettings>('anglifyButtonGroupSettings', DEFAULT_BUTTON_GROUP_SETTINGS, BUTTON_GROUP_SETTINGS),
  ],
})
export class ButtonGroupItemComponent {
  /** Marks this item as active, which changes the style. */
  @Input() public set active(value: boolean) {
    this.active$.next(value);
  }

  public get active() {
    return this.active$.value;
  }

  /** Turns the ripple effect on or off. */
  @Input() public set ripple(value: boolean) {
    this.ripple$.next(value);
  }

  public get ripple() {
    return this.ripple$.value;
  }

  /** Disables this item. */
  @Input() public set disabled(value: boolean) {
    this.disabled$.next(value);
  }

  public get disabled() {
    return this.disabled$.value;
  }

  /** Makes the item not focusable and disables the ripple. */
  @Input() public set readonly(value: boolean) {
    this.readonly$.next(value);
  }

  public get readonly() {
    return this.readonly$.value;
  }

  /** Event that is emitted when the component is clicked. */
  @Output() public readonly onClick = new EventEmitter<void>();

  private readonly active$ = new BehaviorSubject(false);
  private readonly disabled$ = new BehaviorSubject(this.settings.disabled);
  private readonly readonly$ = new BehaviorSubject(this.settings.readonly);
  private readonly ripple$ = new BehaviorSubject(this.settings.ripple);

  public constructor(
    @Host() @Inject('anglifyButtonGroupSettings') public settings: EntireButtonGroupSettings,
    protected readonly rippleService: RippleService,
    protected readonly elementRef: ElementRef<HTMLElement>
  ) {
    bindClassToNativeElement(this, this.active$, this.elementRef.nativeElement, 'active');
    bindClassToNativeElement(this, this.disabled$, this.elementRef.nativeElement, 'disabled');
    bindAttrToNativeElement(
      this,
      combineLatest([this.disabled$, this.readonly$]).pipe(map(([disabled, readonly]) => disabled || readonly)),
      this.elementRef.nativeElement,
      'tabindex',
      '-1'
    );

    merge(this.ripple$, this.disabled$.pipe(map(value => !value)), this.readonly$.pipe(map(value => !value)))
      .pipe(
        untilDestroyed(this),
        tap(value => (this.rippleService.active = value))
      )
      .subscribe();
  }

  @HostListener('click')
  protected click() {
    if (this.disabled$.value) return;
    this.onClick.next();
  }
}
