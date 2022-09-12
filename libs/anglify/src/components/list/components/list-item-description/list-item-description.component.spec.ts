import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { ListItemDescriptionComponent } from './list-item-description.component';

describe('ListItemDescriptionComponent', () => {
  let component: ListItemDescriptionComponent;
  let fixture: ComponentFixture<ListItemDescriptionComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
