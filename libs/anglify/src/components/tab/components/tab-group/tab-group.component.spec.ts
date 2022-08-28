import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabGroupComponent } from './tab-group.component';

describe('TabGroupComponent', () => {
  let component: TabGroupComponent;
  let fixture: ComponentFixture<TabGroupComponent>;
  let nativeElement: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabGroupComponent);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have aria role tablist', () => {
    expect(nativeElement.getAttribute('role')).toBe('tablist');
  });
});
