import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftComponent } from './shift.component';

describe('ShiftComponent', () => {
  let component: ShiftComponent;
  let fixture: ComponentFixture<ShiftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShiftComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShiftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
