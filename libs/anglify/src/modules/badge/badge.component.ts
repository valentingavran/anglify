import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Inject, Input, Self } from '@angular/core';
import { Options } from '@floating-ui/core/src/middleware/offset';
import { BADGE_SETTINGS, DEFAULT_BADGE_SETTINGS } from './badge-settings.token';
import { EntireBadgeSettings } from './badge.interface';
import { Position } from '../../composables/position/position.interface';
import { POSITION } from '../../composables/position/position.provider';
import { PositionService } from '../../composables/position/position.service';
import { createSettingsProvider } from '../../factories/settings.factory';

@Component({
  selector: 'anglify-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireBadgeSettings>('anglifyBadgeSettings', DEFAULT_BADGE_SETTINGS, BADGE_SETTINGS), POSITION],
})
export class BadgeComponent {
  /** Applies a border around the badge. */
  @Input() public border = this.settings.border;
  /** Any content you want injected as text into the badge. */
  @Input() public content = '';

  /** Defines at which position the badge should be displayed. */
  @Input()
  public set position(value: Position) {
    this.positionService.position = value;
  }

  /**  Displaces the badge from the host element along the relevant axes. */
  @Input()
  public set offset(value: Options) {
    this.positionService.offset = value;
  }

  public get offset() {
    return this.positionService.offset;
  }

  public constructor(
    @Self() @Inject('anglifyBadgeSettings') public settings: EntireBadgeSettings,
    public readonly element: ElementRef<HTMLElement>,
    private readonly positionService: PositionService
  ) {
    this.positionService.flip = false;
    this.positionService.shift = false;
    this.positionService.offset = ({ rects, placement }) => {
      switch (placement) {
        case 'left':
          return { mainAxis: -rects.floating.width / 2 };
        case 'left-end':
          return { mainAxis: -rects.floating.width / 2, crossAxis: rects.floating.height / 2 };
        case 'left-start':
          return { mainAxis: -rects.floating.width / 2, crossAxis: -rects.floating.height / 2 };
        case 'right':
          return { mainAxis: -rects.floating.width / 2 };
        case 'right-end':
          return { mainAxis: -rects.floating.width / 2, crossAxis: rects.floating.height / 2 };
        case 'right-start':
          return { mainAxis: -rects.floating.width / 2, crossAxis: -rects.floating.height / 2 };
        case 'bottom':
          return { mainAxis: -rects.floating.height / 2 };
        case 'bottom-start':
          return { mainAxis: -rects.floating.height / 2, crossAxis: -rects.floating.width / 2 };
        case 'bottom-end':
          return { mainAxis: -rects.floating.height / 2, crossAxis: rects.floating.width / 2 };
        case 'top':
          return { mainAxis: -rects.floating.height / 2 };
        case 'top-start':
          return { mainAxis: -rects.floating.height / 2, crossAxis: -rects.floating.width / 2 };
        case 'top-end':
          return { mainAxis: -rects.floating.height / 2, crossAxis: rects.floating.width / 2 };
        default:
          return { mainAxis: -rects.floating.width / 2, crossAxis: -rects.floating.height / 2 };
      }
    };
  }

  @HostBinding('class')
  protected get classList() {
    const classNames = ['badge'];
    if (this.border) {
      classNames.push('border');
    }

    return classNames.join(' ');
  }
}
