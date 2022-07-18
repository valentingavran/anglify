import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TabComponent } from './tab.component';
import { AnglifyCommonModule } from '../../../common/anglify-common.module';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabComponent],
      imports: [AnglifyCommonModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should have aria role 'tab'", () => {
    expect(nativeElement.getAttribute('role')).toBe('tab');
  });

  test('that only active item has tabindex 0', () => {
    expect(nativeElement.getAttribute('tabindex')).toBe('-1');
    component.active = false;
    fixture.detectChanges();
    expect(nativeElement.getAttribute('tabindex')).toBe('-1');
    component.active = true;
    fixture.detectChanges();
    expect(nativeElement.getAttribute('tabindex')).toBe('0');
  });
});
