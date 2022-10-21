import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { DEFAULT_SLIDER_SETTINGS } from './slider-settings.token';
import { SliderComponent } from './slider.component';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default settings', async () => {
    expect(component.min).toBe(DEFAULT_SLIDER_SETTINGS.min);
    expect(component.max).toBe(DEFAULT_SLIDER_SETTINGS.max);
    expect(component.ticks).toBe(DEFAULT_SLIDER_SETTINGS.ticks);
    expect(component.ripple).toBe(DEFAULT_SLIDER_SETTINGS.ripple);
    expect(component.state).toBe(DEFAULT_SLIDER_SETTINGS.state);
  });

  it('should have working aria-disabled attribute', () => {
    expect(nativeElement.getAttribute('aria-disabled')).toBe('false');
    component.disabled = true;
    fixture.detectChanges();
    expect(nativeElement.getAttribute('aria-disabled')).toBe('true');
  });
});
