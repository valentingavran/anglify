import { TestBed } from '@angular/core/testing';
import { Stepper } from './stepper.service';
describe('Stepper', () => {
  let service: Stepper;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Stepper],
    });
    service = TestBed.inject(Stepper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
