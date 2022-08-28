import { TestBed } from '@angular/core/testing';
import { StepperService } from './stepper.service';
describe('Stepper', () => {
  let service: StepperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StepperService],
    });
    service = TestBed.inject(StepperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
