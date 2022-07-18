import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { CheckboxComponent } from './checkbox.component';
import { DEFAULT_CHECKBOX_SETTINGS } from './tokens/checkbox-settings.token';
import { AnglifyCommonModule } from '../common/anglify-common.module';
import { InteractionStateModule } from '../interaction-state/interaction-state.module';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckboxComponent],
      imports: [FormsModule, AnglifyCommonModule, InteractionStateModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default settings', async () => {
    expect(component.labelPosition).toBe(DEFAULT_CHECKBOX_SETTINGS.labelPosition);
    expect(component.rippleOrigin).toBe(DEFAULT_CHECKBOX_SETTINGS.rippleOrigin);
    expect(await firstValueFrom(component.disabled$)).toBe(DEFAULT_CHECKBOX_SETTINGS.disabled);
    expect(await firstValueFrom(component.checked$)).toBe(DEFAULT_CHECKBOX_SETTINGS.checked);
    expect(component.ripple).toBe(DEFAULT_CHECKBOX_SETTINGS.ripple);
  });

  it('should have checkbox role', () => {
    expect(nativeElement.getAttribute('role')).toBe('checkbox');
  });

  it('should have working aria-checked attribute', () => {
    expect(nativeElement.getAttribute('aria-checked')).toBe('false');
    component.checked = true;
    fixture.detectChanges();
    expect(nativeElement.getAttribute('aria-checked')).toBe('true');
  });

  it('should have working aria-disabled attribute', () => {
    expect(nativeElement.getAttribute('aria-disabled')).toBe('false');
    component.disabled = true;
    fixture.detectChanges();
    expect(nativeElement.getAttribute('aria-disabled')).toBe('true');
  });

  it('should have working aria-readonly attribute', () => {
    expect(nativeElement.getAttribute('aria-readonly')).toBe('false');
    component.isReadonly = true;
    fixture.detectChanges();
    expect(nativeElement.getAttribute('aria-readonly')).toBe('true');
  });
});
