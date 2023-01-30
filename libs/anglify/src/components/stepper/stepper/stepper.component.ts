import { AsyncPipe, NgForOf, NgIf, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  Inject,
  Input,
  Output,
  QueryList,
  Self,
  type AfterContentInit,
} from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, startWith, tap } from 'rxjs/operators';
import { SlotDirective } from '../../../directives/slot/slot.directive';
import { SlotOutletDirective } from '../../../directives/slot-outlet/slot-outlet.directive';
import { createSettingsProvider } from '../../../factories/settings.factory';
import { FindSlotPipe } from '../../../pipes/find-slot/find-slot.pipe';
import { INTERNAL_ICONS } from '../../../tokens/internal-icons.token';
import { fastInFastOutY, slide } from '../../../utils/animations';
import { IconComponent } from '../../icon/icon.component';
import { InternalIconSetDefinition } from '../../icon/icon.interface';
import { StepDirective } from '../step.directive';
import { StepperHeaderComponent } from '../stepper-header/stepper-header.component';
import { StepperOrientation, StepperSettingsService } from '../stepper-settings.service';
import { StepperService } from '../stepper.service';
import { DEFAULT_STEPPER_SETTINGS, STEPPER_SETTINGS } from './stepper-settings.token';
import { EntireStepperSettings } from './stepper.interface';

@UntilDestroy()
@Component({
  selector: 'anglify-stepper',
  standalone: true,
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: StepperService, useExisting: StepperComponent },
    StepperSettingsService,
    createSettingsProvider<EntireStepperSettings>('anglifyStepperSettings', DEFAULT_STEPPER_SETTINGS, STEPPER_SETTINGS),
  ],
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
export class StepperComponent extends StepperService implements EntireStepperSettings, AfterContentInit {
  @ContentChildren(StepDirective) private readonly _steps?: QueryList<StepDirective>;

  @ContentChildren(SlotDirective) protected readonly slots?: QueryList<SlotDirective>;

  @Input() public set stepConnectionLine(value: boolean) {
    this.stepperSettings.setHasStepConnectionLine(value);
  }

  @Input() public set headerNavigation(value: boolean) {
    this.stepperSettings.setHeaderNavigationEnabled(value);
  }

  @Input() public set orientation(value: StepperOrientation) {
    this.stepperSettings.setOrientation(value);
  }

  @Input() public disableAnimations = false;

  // eslint-disable-next-line rxjs/finnish, @angular-eslint/no-output-on-prefix
  @Output() public readonly onPrevious = super.onPrevious$;

  // eslint-disable-next-line rxjs/finnish, @angular-eslint/no-output-on-prefix
  @Output() public readonly onNext = super.onNext$;

  // eslint-disable-next-line rxjs/finnish, @angular-eslint/no-output-on-prefix
  @Output() public readonly onOrientationChange = this.stepperSettings.orientation$;

  // eslint-disable-next-line rxjs/finnish, @angular-eslint/no-output-on-prefix
  @Output() public readonly onReset = super.onReset$;

  // eslint-disable-next-line rxjs/finnish, @angular-eslint/no-output-on-prefix
  @Output() public readonly onStepChange = this.selectedStep$;

  private readonly orientationHandler$ = this.stepperSettings.orientation$.pipe(
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
    @Self() @Inject('anglifyStepperSettings') private readonly settings: EntireStepperSettings,
    public readonly stepperSettings: StepperSettingsService,
    private readonly elementRef: ElementRef<HTMLElement>,
    @Inject(INTERNAL_ICONS) protected readonly internalIcons: InternalIconSetDefinition
  ) {
    super();
    this.stepperSettings.setHasStepConnectionLine(this.settings.stepConnectionLine);
    this.stepperSettings.setHeaderNavigationEnabled(this.settings.headerNavigation);
    this.stepperSettings.setOrientation(this.settings.orientation);
    this.orientationHandler$.pipe(untilDestroyed(this)).subscribe();
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
