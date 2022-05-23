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
import { fastInFastOutY, slide } from 'libs/anglify/src/utils/animations';
import { map, startWith, tap } from 'rxjs/operators';
import { INTERNAL_ICONS } from '../../../../tokens/internal-icons.token';
import { toBoolean } from '../../../../utils/functions';
import { BooleanLike } from '../../../../utils/interfaces';
import { SlotDirective } from '../../../common/directives/slot/slot.directive';
import { InternalIconSetDefinition } from '../../../icon/icon.interface';
import { Step } from '../../directives/step/step.directive';
import { StepperOrientation, StepperSettings } from '../../services/stepper-settings/stepper-settings.service';
import { Stepper } from '../../services/stepper/stepper.service';

@UntilDestroy()
@Component({
  selector: 'anglify-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: Stepper, useExisting: StepperComponent }, StepperSettings],
  animations: [fastInFastOutY({ duration: '500ms' }), slide()],
})
export class StepperComponent extends Stepper implements AfterContentInit {
  @ContentChildren(Step) private readonly _steps?: QueryList<Step>;
  @ContentChildren(SlotDirective) public readonly slots?: QueryList<SlotDirective>;

  @Input()
  public set stepConnectionLine(value: BooleanLike) {
    this.stepperSettings.setHasStepConnectionLine(toBoolean(value));
  }

  @Input()
  public set headerNavigation(value: BooleanLike) {
    this.stepperSettings.setHeaderNavigationEnabled(toBoolean(value));
  }

  @Input()
  public set orientation(value: StepperOrientation) {
    this.stepperSettings.setOrientation(value);
  }

  @Output() public readonly onPrevious = this.onPrevious$;
  @Output() public readonly onNext = this.onNext$;
  @Output() public readonly orientationChange = this.stepperSettings.orientation$;
  @Output() public readonly onReset = this.onReset$;
  @Output() public readonly stepChange = this.selectedStep$;

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
      map((steps: QueryList<Step>) => steps.toArray()),
      tap(steps => this.updateSteps(steps))
    ).subscribe();
  }
}
