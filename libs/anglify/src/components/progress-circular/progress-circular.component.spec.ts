import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { ProgressCircularComponent } from './progress-circular.component';

describe('ProgressCircularComponent', () => {
  let component: ProgressCircularComponent;
  let fixture: ComponentFixture<ProgressCircularComponent>;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressCircularComponent);
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
