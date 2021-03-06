import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressLinearComponent } from './progress-linear.component';
import { AnglifyCommonModule } from '../common/anglify-common.module';

describe('ProgressLinearComponent', () => {
  let component: ProgressLinearComponent;
  let fixture: ComponentFixture<ProgressLinearComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProgressLinearComponent],
      imports: [AnglifyCommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressLinearComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no aria-valuenow attribute if the value is indeterminate', () => {
    component.indeterminate = true;
    fixture.detectChanges();
    expect(nativeElement.getAttribute('aria-valuenow')).toBeNull();
  });

  it('should have aria-valuenow attribute if the value is not indeterminate', () => {
    component.indeterminate = false;
    component.value = 60;
    fixture.detectChanges();
    expect(nativeElement.getAttribute('aria-valuenow')).toBe('60');
  });

  it('should have progressbar role', () => {
    expect(nativeElement.getAttribute('role')).toBe('progressbar');
  });
});
