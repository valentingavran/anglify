import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { StepperHeaderComponent } from './stepper-header.component';
import { StepperSettings } from '../../services/stepper-settings/stepper-settings.service';
import { StepperService } from '../../services/stepper/stepper.service';

describe('StepperHeaderComponent', () => {
  let component: StepperHeaderComponent;
  let fixture: ComponentFixture<StepperHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: StepperSettings,
          useValue: {
            hasStepConnectionLine$: new BehaviorSubject(true),
            headerNavigationEnabled$: new BehaviorSubject(true),
          },
        },
        {
          provide: StepperService,
          useClass: StepperService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
