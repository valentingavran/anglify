import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Inject, Input, OnInit, Self } from '@angular/core';
import { BUTTON_SETTINGS, DEFAULT_BUTTON_SETTINGS } from './button-settings.token';
import { ButtonAppearance, ButtonSettings } from './button.interface';
import { RIPPLE } from '../../composables/ripple/ripple.provider';
import { RippleService } from '../../composables/ripple/ripple.service';
import { createSettingsProvider } from '../../factories/settings.factory';
import { toBoolean } from '../../utils/functions';
import { BooleanLike } from '../../utils/interfaces';

@Component({
  selector: 'button[anglifyButton]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<ButtonSettings>('anglifyButtonSettings', DEFAULT_BUTTON_SETTINGS, BUTTON_SETTINGS), RIPPLE],
})
export class ButtonComponent implements OnInit {
  @Input() public appearance: ButtonAppearance = this.settings.appearance;

  /**
   * Expands the button to 100% of available space.
   */
  @Input() public block: BooleanLike = this.settings.block;

  @Input()
  public set ripple(value: BooleanLike) {
    this.rippleService.active = toBoolean(value);
  }

  public get ripple(): boolean {
    return this.rippleService.active;
  }

  @Input()
  public set state(value: BooleanLike) {
    this.rippleService.state = toBoolean(value);
  }

  public get state(): boolean {
    return this.rippleService.state;
  }

  public constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    @Self() @Inject('anglifyButtonSettings') public settings: Required<ButtonSettings>,
    private readonly rippleService: RippleService
  ) {
    this.ripple = this.settings.ripple;
    this.state = this.settings.state;
  }

  public ngOnInit() {
    const children = Array.from(this.elementRef.nativeElement.children);
    const hasLeftIcon = children.some(child => {
      if (child.tagName === 'ANGLIFY-ICON') {
        const right = Array.from(child.attributes).some(attribute => attribute.name === 'left');
        return Boolean(right);
      }
      return false;
    });

    const hasRightIcon = children.some(child => {
      if (child.tagName === 'ANGLIFY-ICON') {
        const right = Array.from(child.attributes).some(attribute => attribute.name === 'right');
        return Boolean(right);
      }
      return false;
    });

    if (hasLeftIcon) {
      this.elementRef.nativeElement.classList.add('has-left-icon');
    }
    if (hasRightIcon) {
      this.elementRef.nativeElement.classList.add('has-right-icon');
    }
  }

  @HostBinding('class')
  protected get classList() {
    const classNames: string[] = [this.appearance];

    if (toBoolean(this.block)) {
      classNames.push('block');
    }

    return classNames.join(' ');
  }
}
