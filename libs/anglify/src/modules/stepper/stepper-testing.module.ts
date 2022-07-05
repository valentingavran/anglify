import { NgModule } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StepperComponent } from './components/stepper/stepper.component';
import { StepDirective } from './directives/step/step.directive';
import { StepperSettings } from './services/stepper-settings/stepper-settings.service';
import { StepperService } from './services/stepper/stepper.service';

@NgModule({
  providers: [
    {
      provide: StepDirective,
      useValue: {
        isFirstStep$: new BehaviorSubject(true),
        isLastStep$: new BehaviorSubject(true),
        label$: new BehaviorSubject(true),
        visited$: new BehaviorSubject(true),
        valid$: new BehaviorSubject(true),
        index$: new BehaviorSubject(true),
        selected$: new BehaviorSubject(true),
        setLabel: () => {},
        getLabelSnapshot: () => '',
        setVisited: () => {},
        getVisitedSnapshot: () => true,
        setIsFirstStep: () => {},
        setISLastStep: () => {},
        setIndex: () => {},
        getIndexSnapshot: () => 0,
        setValid: () => {},
        getValidSnapshot: () => true,
      },
    },
    { provide: StepperService, useClass: StepperComponent },
    { provide: StepperSettings, useClass: StepperSettings },
  ],
})
export class StepperTestingModule {}
