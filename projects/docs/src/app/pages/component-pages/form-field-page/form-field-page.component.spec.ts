import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldPageComponent } from './form-field-page.component';

describe('FormFieldPageComponent', () => {
  let component: FormFieldPageComponent;
  let fixture: ComponentFixture<FormFieldPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormFieldPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormFieldPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
