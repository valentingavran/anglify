import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from './checkbox.component';
import { DEFAULT_CHECKBOX_SETTINGS } from './tokens/checkbox.token';
import { AnglifyCommonModule } from '../common/anglify-common.module';
import { InteractionStateModule } from '../interaction-state/interaction-state.module';
describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckboxComponent],
      imports: [FormsModule, AnglifyCommonModule, InteractionStateModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default settings', () => {
    expect(component.labelPosition).toBe(DEFAULT_CHECKBOX_SETTINGS.labelPosition);
    expect(component.rippleOrigin).toBe(DEFAULT_CHECKBOX_SETTINGS.rippleOrigin);
    expect(component.checked).toBe(DEFAULT_CHECKBOX_SETTINGS.checked);
    expect(component.disabled).toBe(DEFAULT_CHECKBOX_SETTINGS.disabled);
    expect(component.ripple).toBe(DEFAULT_CHECKBOX_SETTINGS.ripple);
  });
});
