import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtendedComponent } from './extended.component';

describe('ExtendedComponent', () => {
  let component: ExtendedComponent;
  let fixture: ComponentFixture<ExtendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExtendedComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
