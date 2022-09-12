import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { DEFAULT_CARD_SETTINGS } from './card-settings.token';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default settings', () => {
    expect(component.elevation).toBe(DEFAULT_CARD_SETTINGS.elevation);
    expect(component.ripple).toBe(DEFAULT_CARD_SETTINGS.ripple);
  });
});
