import {NgModule} from '@angular/core';
import {Step} from './directives/step/step.directive';
import {Stepper} from "./services/stepper/stepper.service";
import {StepperComponent} from "./components/stepper/stepper.component";
import {BehaviorSubject} from "rxjs";
import {StepperSettings} from "./services/stepper-settings/stepper-settings.service";

@NgModule({
  providers: [{
    provide: Step,
    useValue: {
      isFirstStep$: new BehaviorSubject(true),
      isLastStep$: new BehaviorSubject(true),
      label$: new BehaviorSubject(true),
      visited$: new BehaviorSubject(true),
      valid$: new BehaviorSubject(true),
      index$: new BehaviorSubject(true),
      selected$: new BehaviorSubject(true),
      setLabel: () => {
      },
      getLabelSnapshot: () => {
        return "";
      },
      setVisited: () => {
      },
      getVisitedSnapshot: () => {
        return true;
      },
      setIsFirstStep: () => {
      },
      setISLastStep: () => {
      },
      setIndex: () => {
      },
      getIndexSnapshot: () => {
        return 0;
      },
      setValid: () => {
      },
      getValidSnapshot: () => {
        return true;
      },
    },
  },
    {provide: Stepper, useClass: StepperComponent},
    {provide: StepperSettings, useClass: StepperSettings}]
})
export class StepperTestingModule {
}
