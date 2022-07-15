import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Inject, Input, OnInit, Self } from '@angular/core';
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
export class ButtonComponent implements OnInit {
  @Input() public appearance: ButtonAppearance = this.settings.appearance;

  /**
   * Expands the button to 100% of available space.
   */
  @Input() public block = this.settings.block;

  @Input()
  public set ripple(value: boolean) {
    this.rippleService.active = value;
  }

  public get ripple() {
    return this.rippleService.active;
  }

  @Input()
  public set state(value: boolean) {
    this.rippleService.state = value;
  }

  public get state() {
    return this.rippleService.state;
  }

  public constructor(
    private readonly elementRef: ElementRef<HTMLElement>,
    @Self() @Inject('anglifyButtonSettings') public settings: EntireButtonSettings,
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

    if (this.block) {
      classNames.push('block');
    }

    return classNames.join(' ');
  }
}
