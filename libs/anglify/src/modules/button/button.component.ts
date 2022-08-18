import { ChangeDetectionStrategy, Component, HostBinding, Inject, Input, Self } from '@angular/core';
import { BUTTON_SETTINGS, DEFAULT_BUTTON_SETTINGS } from './button-settings.token';
import { ButtonAppearance, EntireButtonSettings } from './button.interface';
import { RIPPLE } from '../../composables/ripple/ripple.provider';
import { RippleService } from '../../composables/ripple/ripple.service';
import { createSettingsProvider } from '../../factories/settings.factory';

@Component({
  selector: 'button[anglifyButton]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireButtonSettings>('anglifyButtonSettings', DEFAULT_BUTTON_SETTINGS, BUTTON_SETTINGS), RIPPLE],
})
export class ButtonComponent {
  /** Sets one of several predefined styles. */
  @Input() @HostBinding('class') public appearance: ButtonAppearance = this.settings.appearance;

  /** Expands the button to 100% of available space. */
  @Input() @HostBinding('class.block') public block = this.settings.block;

  /** Turns the ripple effect on or off. */
  @Input() public set ripple(value: boolean) {
    this.rippleService.active = value;
  }

  public get ripple() {
    return this.rippleService.active;
  }

  /** Controls whether to display the focus and hover styles for this component. */
  @Input() public set state(value: boolean) {
    this.rippleService.state = value;
  }

  public get state() {
    return this.rippleService.state;
  }

  public constructor(
    @Self() @Inject('anglifyButtonSettings') public settings: EntireButtonSettings,
    private readonly rippleService: RippleService
  ) {
    this.ripple = this.settings.ripple;
    this.state = this.settings.state;
  }
}
