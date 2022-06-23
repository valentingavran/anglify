import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressLinearComponent } from './progress-linear.component';
import { AnglifyCommonModule } from '../common/anglify-common.module';

describe('ProgressLinearComponent', () => {
  let component: ProgressLinearComponent;
  let fixture: ComponentFixture<ProgressLinearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressLinearComponent],
      imports: [AnglifyCommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressLinearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
