import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipPageComponent } from './tooltip-page.component';

describe('TooltipPageComponent', () => {
  let component: TooltipPageComponent;
  let fixture: ComponentFixture<TooltipPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TooltipPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
