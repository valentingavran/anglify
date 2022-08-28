import { AsyncPipe, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Inject,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, startWith, tap } from 'rxjs/operators';
import { INTERNAL_ICONS } from '../../../../tokens/internal-icons.token';
import { fastInFastOutY, slide } from '../../../../utils/animations';
import { SlotOutletDirective } from '../../../common/directives/slot-outlet/slot-outlet.directive';

import { SlotDirective } from '../../../common/directives/slot/slot.directive';
import { FindSlotPipe } from '../../../common/pipes/find-slot/find-slot.pipe';
import { IconComponent } from '../../../icon/icon.component';
import { InternalIconSetDefinition } from '../../../icon/icon.interface';
import { StepDirective } from '../../directives/step/step.directive';
import { StepperOrientation, StepperSettings } from '../../services/stepper-settings/stepper-settings.service';
import { StepperService } from '../../services/stepper/stepper.service';
import { StepperHeaderComponent } from '../stepper-header/stepper-header.component';

@UntilDestroy()
@Component({
  selector: 'anglify-stepper',
  standalone: true,
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: StepperService, useExisting: StepperComponent }, StepperSettings],
  animations: [fastInFastOutY({ duration: '500ms' }), slide()],
  imports: [
    StepperHeaderComponent,
    AsyncPipe,
    IconComponent,
    NgTemplateOutlet,
    NgForOf,
    NgIf,
    SlotOutletDirective,
    FindSlotPipe,
    SlotDirective,
  ],
})
export class StepperComponent extends StepperService implements AfterContentInit {
  @ContentChildren(StepDirective) private readonly _steps?: QueryList<StepDirective>;
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;

  /** Shows or hides the line between the step headers. */
  @Input() public set stepConnectionLine(value: boolean) {
    this.stepperSettings.setHasStepConnectionLine(value);
  }

  /** Specify whether it is possible to navigate between steps by clicking on the individual step headers. */
  @Input() public set headerNavigation(value: boolean) {
    this.stepperSettings.setHeaderNavigationEnabled(value);
  }

  /** Whether the steps should be listed vertically or horizontally. */
  @Input() public set orientation(value: StepperOrientation) {
    this.stepperSettings.setOrientation(value);
  }

  @Output() public readonly onPrevious = this.onPrevious$;
  @Output() public readonly onNext = this.onNext$;
  @Output() public readonly onOrientationChange = this.stepperSettings.orientation$;
  @Output() public readonly onReset = this.onReset$;
  @Output() public readonly onStepChange = this.selectedStep$;

  private readonly _orientationHandler$ = this.stepperSettings.orientation$.pipe(
    tap(orientation => {
      if (orientation === 'horizontal') {
        this.nativeElement.classList.add(orientation);
        this.nativeElement.classList.remove('vertical');
      } else {
        this.nativeElement.classList.add(orientation);
        this.nativeElement.classList.remove('horizontal');
      }
    })
  );

  private readonly nativeElement = this.elementRef.nativeElement;

  public constructor(
    public readonly stepperSettings: StepperSettings,
    private readonly elementRef: ElementRef<HTMLElement>,
    @Inject(INTERNAL_ICONS) public readonly internalIcons: InternalIconSetDefinition
  ) {
    super();
    this._orientationHandler$.pipe(untilDestroyed(this)).subscribe();
  }

  public ngAfterContentInit() {
    this._steps!.changes.pipe(
      startWith(this._steps),
      untilDestroyed(this),
      map((steps: QueryList<StepDirective>) => steps.toArray()),
      tap(steps => this.updateSteps(steps))
    ).subscribe();
  }
}
