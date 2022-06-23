import { TestBed } from '@angular/core/testing';
import { StepperSettings } from './stepper-settings.service';
describe('StepperSettings', () => {
  let service: StepperSettings;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StepperSettings],
    });
    service = TestBed.inject(StepperSettings);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
