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
import { bindClassToNativeElement, toBoolean } from '../../../../utils/functions';
import { BooleanLike } from '../../../../utils/interfaces';
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

  @Input() public hideToggle: BooleanLike = false;
  @Input() public label?: string;

  @Input() public set active(value: BooleanLike) {
    this._active$.next(toBoolean(value));
  }

  public get active() {
    return this._active$.value;
  }

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
