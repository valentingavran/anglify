import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylingTableComponent } from './styling-table.component';

describe('StylingTableComponent', () => {
  let component: StylingTableComponent;
  let fixture: ComponentFixture<StylingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StylingTableComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StylingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
