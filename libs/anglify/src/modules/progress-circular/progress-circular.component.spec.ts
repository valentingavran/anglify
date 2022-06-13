import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressCircularComponent } from './progress-circular.component';

describe('ProgressCircularComponent', () => {
  let component: ProgressCircularComponent;
  let fixture: ComponentFixture<ProgressCircularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressCircularComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressCircularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
