import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, HostBinding, Inject, Input, QueryList, Self } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RIPPLE } from '../../composables/ripple/ripple.provider';
import { RippleService } from '../../composables/ripple/ripple.service';
import { SlotDirective } from '../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../directives/slot-outlet/slot-outlet.directive';
import { createSettingsProvider } from '../../factories/settings.factory';
import { FindSlotPipe } from '../../pipes/find-slot/find-slot.pipe';
import { ProgressCircularComponent } from '../progress-circular/progress-circular.component';
import { BUTTON_SETTINGS, DEFAULT_BUTTON_SETTINGS } from './button-settings.token';
import { ButtonAppearance, EntireButtonSettings } from './button.interface';

@Component({
  selector: 'button[anglifyButton]',
  standalone: true,
  imports: [ProgressCircularComponent, NgIf, AsyncPipe, NgClass, SlotOutletDirective, FindSlotPipe],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireButtonSettings>('anglifyButtonSettings', DEFAULT_BUTTON_SETTINGS, BUTTON_SETTINGS), RIPPLE],
})
export class ButtonComponent {
  @ContentChildren(SlotDirective) protected readonly slots?: QueryList<SlotDirective>;

  /**
   * Sets one of several predefined styles.
   */
  @Input() @HostBinding('class') public appearance: ButtonAppearance = this.settings.appearance;

  /**
   * Expands the button to 100% of available space.
   */
  @Input() @HostBinding('class.block') public block = this.settings.block;

  public get ripple() {
    return this.rippleService.active;
  }

  /**
   * Turns the ripple effect on or off.
   */
  @Input() public set ripple(value: boolean) {
    this.rippleService.active = value;
  }

  public get state() {
    return this.rippleService.state;
  }

  /**
   * Controls whether to display the focus and hover styles for this component.
   */
  @Input() public set state(value: boolean) {
    this.rippleService.state = value;
  }

  public get loading() {
    return this.loading$.value;
  }

  @Input() public set loading(value: boolean) {
    this.loading$.next(value);
  }

  protected loading$ = new BehaviorSubject(false);

  public constructor(
    @Self() @Inject('anglifyButtonSettings') private readonly settings: EntireButtonSettings,
    private readonly rippleService: RippleService
  ) {
    this.ripple = this.settings.ripple;
    this.state = this.settings.state;
  }
}
