import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Host, HostListener, Inject, Input, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, combineLatest, map, merge, tap } from 'rxjs';
import { RIPPLE } from '../../../composables/ripple/ripple.provider';
import { RippleService } from '../../../composables/ripple/ripple.service';
import { createSettingsProvider } from '../../../factories/settings.factory';
import { bindAttrToNativeElement, bindClassToNativeElement } from '../../../utils/functions';
import { BUTTON_GROUP_ITEM_SETTINGS, DEFAULT_BUTTON_GROUP_ITEM_SETTINGS } from './button-group-item-settings.token';
import { EntireButtonGroupItemSettings } from './button-group-item.interface';

@UntilDestroy()
@Component({
  selector: 'button[anglifyButtonGroupItem]',
  standalone: true,
  templateUrl: './button-group-item.component.html',
  styleUrls: ['./button-group-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    RIPPLE,
    createSettingsProvider<EntireButtonGroupItemSettings>(
      'anglifyButtonGroupItemSettings',
      DEFAULT_BUTTON_GROUP_ITEM_SETTINGS,
      BUTTON_GROUP_ITEM_SETTINGS
    ),
  ],
})
export class ButtonGroupItemComponent implements EntireButtonGroupItemSettings {
  public get active() {
    return this.active$.value;
  }

  /**
   * Marks this item as active, which changes the style.
   */
  @Input() public set active(value: boolean) {
    this.active$.next(value);
  }

  public get ripple() {
    return this.ripple$.value;
  }

  @Input() public set ripple(value: boolean) {
    this.ripple$.next(value);
  }

  public get disabled() {
    return this.disabled$.value;
  }

  @Input() public set disabled(value: boolean) {
    this.disabled$.next(value);
  }

  public get readonly() {
    return this.readonly$.value;
  }

  @Input() public set readonly(value: boolean) {
    this.readonly$.next(value);
  }

  /**
   * Event that is emitted when the component is clicked.
   */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public readonly onClick = new EventEmitter<void>();

  private readonly active$ = new BehaviorSubject(false);

  private readonly disabled$ = new BehaviorSubject(this.settings.disabled);

  private readonly readonly$ = new BehaviorSubject(this.settings.readonly);

  private readonly ripple$ = new BehaviorSubject(this.settings.ripple);

  public constructor(
    @Host() @Inject('anglifyButtonGroupItemSettings') private readonly settings: EntireButtonGroupItemSettings,
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
