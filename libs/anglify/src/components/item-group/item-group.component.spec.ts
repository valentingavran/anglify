import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { ItemGroupComponent } from './item-group.component';

describe('GroupComponent', () => {
  let component: ItemGroupComponent;
  let fixture: ComponentFixture<ItemGroupComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
