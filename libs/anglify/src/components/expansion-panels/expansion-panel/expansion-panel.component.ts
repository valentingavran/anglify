import { AsyncPipe, NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Host,
  Inject,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { Elevation } from '../../../composables/elevation/elevation.interface';
import { ELEVATION } from '../../../composables/elevation/elevation.provider';
import { ElevationService } from '../../../composables/elevation/elevation.service';
import { InteractionStateDirective } from '../../../directives/interaction-state/interaction-state.directive';
import { SlotDirective } from '../../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../../directives/slot-outlet/slot-outlet.directive';
import { createSettingsProvider } from '../../../factories/settings.factory';
import { FindSlotPipe } from '../../../pipes/find-slot/find-slot.pipe';
import { INTERNAL_ICONS } from '../../../tokens/internal-icons.token';
import { fastInFastOutY, rotate } from '../../../utils/animations';
import { bindClassToNativeElement } from '../../../utils/functions';
import { IconComponent } from '../../icon/icon.component';
import { InternalIconSetDefinition } from '../../icon/icon.interface';
import { DEFAULT_EXPANSION_PANEL_SETTINGS, EXPANSION_PANEL_SETTINGS } from './expansion-panel-settings.token';
import { EntireExpansionPanelSettings } from './expansion-panel.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-expansion-panel',
  standalone: true,
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ELEVATION,
    createSettingsProvider<EntireExpansionPanelSettings>(
      'anglifyExpansionPanelSettings',
      DEFAULT_EXPANSION_PANEL_SETTINGS,
      EXPANSION_PANEL_SETTINGS
    ),
  ],
  animations: [fastInFastOutY(), rotate()],
  imports: [NgIf, IconComponent, AsyncPipe, SlotOutletDirective, FindSlotPipe, InteractionStateDirective],
})
export class ExpansionPanelComponent implements EntireExpansionPanelSettings {
  @ContentChildren(SlotDirective) protected readonly slots?: QueryList<SlotDirective>;

  @Input() public hideToggle = this.settings.hideToggle;

  @Input() public label = this.settings.label;

  public get elevation() {
    return this.elevationService.elevation;
  }

  @Input() public set elevation(value: Elevation) {
    this.elevationService.elevation = value;
  }

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() public readonly onClick = new EventEmitter<void>();

  public get active() {
    return this._active$.value;
  }

  /**
   * Sets this item as active by default
   */
  public set active(value: boolean) {
    this._active$.next(value);
  }

  private readonly _active$ = new BehaviorSubject<boolean>(false);

  protected active$ = this._active$.asObservable();

  public constructor(
    @Host() @Inject('anglifyExpansionPanelSettings') private readonly settings: EntireExpansionPanelSettings,
    @Inject(INTERNAL_ICONS) protected readonly internalIcons: InternalIconSetDefinition,
    private readonly elevationService: ElevationService,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {
    this.elevation = this.settings.elevation;
    bindClassToNativeElement(this, this.active$, this.elementRef.nativeElement, 'anglify-expansion-panel-active');
  }
}
