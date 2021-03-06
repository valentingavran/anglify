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
import { Elevation } from '../../../../composables/elevation/elevation.interface';
import { ELEVATION } from '../../../../composables/elevation/elevation.provider';
import { ElevationService } from '../../../../composables/elevation/elevation.service';
import { INTERNAL_ICONS } from '../../../../tokens/internal-icons.token';
import { fastInFastOutY, rotate } from '../../../../utils/animations';
import { bindClassToNativeElement } from '../../../../utils/functions';

import { SlotDirective } from '../../../common/directives/slot/slot.directive';
import { InternalIconSetDefinition } from '../../../icon/icon.interface';
import { EntireExpansionPanelsSettings } from '../../expansion-panels.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ELEVATION],
  animations: [fastInFastOutY(), rotate()],
})
export class ExpansionPanelComponent {
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;

  /** Hide the expand icon in the panel header. */
  @Input() public hideToggle = false;
  /** The label in the panel header. */
  @Input() public label?: string;

  /** Sets this item as active by default */
  @Input() public set active(value: boolean) {
    this._active$.next(value);
  }

  public get active() {
    return this._active$.value;
  }

  /** Designates an elevation applied to the component between 0 and 24. You can find more
   * information on the elevation page. */
  @Input() public set elevation(value: Elevation) {
    this.elevationService.elevation = value;
  }

  public get elevation() {
    return this.elevationService.elevation;
  }

  @Output() public readonly onClick = new EventEmitter<void>();

  private readonly _active$ = new BehaviorSubject<boolean>(false);
  public active$ = this._active$.asObservable();

  public constructor(
    @Inject(INTERNAL_ICONS) public readonly internalIcons: InternalIconSetDefinition,
    private readonly elevationService: ElevationService,
    private readonly elementRef: ElementRef<HTMLElement>,
    @Host() @Inject('anglifyExpansionPanelsSettings') public settings: EntireExpansionPanelsSettings
  ) {
    this.elevation = this.settings.elevation;
    bindClassToNativeElement(this, this.active$, this.elementRef.nativeElement, 'anglify-expansion-panel-active');
  }
}
