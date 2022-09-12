import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  QueryList,
  Self,
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { Elevation } from '../../composables/elevation/elevation.interface';
import { ELEVATION } from '../../composables/elevation/elevation.provider';
import { ElevationService } from '../../composables/elevation/elevation.service';
import { SlotDirective } from '../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../directives/slot-outlet/slot-outlet.directive';
import { createSettingsProvider } from '../../factories/settings.factory';
import { FindSlotPipe } from '../../pipes/find-slot/find-slot.pipe';
import { bindAttrToNativeElement } from '../../utils/functions';
import { DEFAULT_TOOLBAR_SETTINGS, TOOLBAR_SETTINGS } from './toolbar-settings.token';
import { EntireToolbarSettings } from './toolbar.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-toolbar',
  standalone: true,
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    createSettingsProvider<EntireToolbarSettings>('anglifyToolbarSettings', DEFAULT_TOOLBAR_SETTINGS, TOOLBAR_SETTINGS),
    ELEVATION,
  ],
  imports: [NgIf, FindSlotPipe, SlotOutletDirective],
})
export class ToolbarComponent {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;

  /**
   * Increases the height of the toolbar.
   */
  @Input() @HostBinding('class.prominent') public prominent: boolean = this.settings.prominent;

  /**
   * Puts the toolbar into a collapsed state reducing its maximum width.
   */
  @Input() @HostBinding('class.collapse') public collapse: boolean = this.settings.collapse;

  public get elevation() {
    return this.elevationService.elevation;
  }

  /**
   * Designates an elevation applied to the component between 0 and 24. You can find more
   * information on the elevation page.
   */
  @Input() public set elevation(value: Elevation) {
    this.elevationService.elevation = value;
  }

  public get app() {
    return this.app$.value;
  }

  @Input() public set app(value: boolean) {
    this.app$.next(value);
  }

  private readonly app$ = new BehaviorSubject(false);

  public constructor(
    @Self() @Inject('anglifyToolbarSettings') public settings: EntireToolbarSettings,
    private readonly elevationService: ElevationService,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {
    this.elevation = this.settings.elevation;
    bindAttrToNativeElement(this, this.app$, this.elementRef.nativeElement, 'role', 'navigation');
  }
}
