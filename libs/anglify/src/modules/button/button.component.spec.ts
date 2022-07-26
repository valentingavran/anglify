import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DEFAULT_BUTTON_SETTINGS } from './button-settings.token';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default settings', () => {
    expect(component.appearance).toBe(DEFAULT_BUTTON_SETTINGS.appearance);
    expect(component.block).toBe(DEFAULT_BUTTON_SETTINGS.block);
    expect(component.block).toBe(DEFAULT_BUTTON_SETTINGS.block);
    expect(component.state).toBe(DEFAULT_BUTTON_SETTINGS.state);
  });
});
