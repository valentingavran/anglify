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
import { Elevation } from '../../../../composables/elevation/elevation.interface';
import { ELEVATION } from '../../../../composables/elevation/elevation.provider';
import { ElevationService } from '../../../../composables/elevation/elevation.service';
import { InteractionStateDirective } from '../../../../directives/interaction-state/interaction-state.directive';
import { SlotDirective } from '../../../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../../../directives/slot-outlet/slot-outlet.directive';
import { FindSlotPipe } from '../../../../pipes/find-slot/find-slot.pipe';
import { INTERNAL_ICONS } from '../../../../tokens/internal-icons.token';
import { fastInFastOutY, rotate } from '../../../../utils/animations';
import { bindClassToNativeElement } from '../../../../utils/functions';
import { IconComponent } from '../../../icon/icon.component';
import { InternalIconSetDefinition } from '../../../icon/icon.interface';
import { EntireExpansionPanelsSettings } from '../../expansion-panels.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-expansion-panel',
  standalone: true,
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ELEVATION],
  animations: [fastInFastOutY(), rotate()],
  imports: [NgIf, IconComponent, AsyncPipe, SlotOutletDirective, FindSlotPipe, InteractionStateDirective],
})
export class ExpansionPanelComponent {
  @ContentChildren(SlotDirective) protected readonly slots?: QueryList<SlotDirective>;

  /**
   * Hide the expand icon in the panel header.
   */
  @Input() public hideToggle = false;

  /**
   * The label in the panel header.
   */
  @Input() public label?: string;

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
    @Host() @Inject('anglifyExpansionPanelsSettings') private readonly settings: EntireExpansionPanelsSettings,
    @Inject(INTERNAL_ICONS) protected readonly internalIcons: InternalIconSetDefinition,
    private readonly elevationService: ElevationService,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {
    this.elevation = this.settings.elevation;
    bindClassToNativeElement(this, this.active$, this.elementRef.nativeElement, 'anglify-expansion-panel-active');
  }
}
