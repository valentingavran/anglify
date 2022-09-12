import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { ButtonGroupItemComponent } from './button-group-item.component';

describe('ButtonGroupItemComponent', () => {
  let component: ButtonGroupItemComponent;
  let fixture: ComponentFixture<ButtonGroupItemComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonGroupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
