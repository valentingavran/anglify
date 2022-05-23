import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Inject, Input, Self, ViewContainerRef } from '@angular/core';
import { BADGE_SETTINGS, DEFAULT_BADGE_SETTINGS } from './badge-settings.token';
import { EntireBadgeSettings } from './badge.interface';
import { Position } from '../../composables/position/position.interface';
import { POSITION } from '../../composables/position/position.provider';
import { PositionService } from '../../composables/position/position.service';
import { createSettingsProvider } from '../../factories/settings.factory';
import { toBoolean } from '../../utils/functions';

@Component({
  selector: 'anglify-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [createSettingsProvider<EntireBadgeSettings>('anglifyBadgeSettings', DEFAULT_BADGE_SETTINGS, BADGE_SETTINGS), POSITION],
})
export class BadgeComponent {
  @Input() public border = this.settings.border;
  @Input() public content = '';
  @Input() public viewContainerRef!: ViewContainerRef;

  @Input()
  public set position(value: Position) {
    this.positionService.position = value;
  }

  @Input()
  public set offset(value: number) {
    this.positionService.offset = value;
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
    if (toBoolean(this.border)) {
      classNames.push('border');
    }

    return classNames.join(' ');
  }
}
