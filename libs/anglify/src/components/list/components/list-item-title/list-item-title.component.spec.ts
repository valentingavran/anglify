import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemTitleComponent } from './list-item-title.component';

describe('ListItemTitleComponent', () => {
  let component: ListItemTitleComponent;
  let fixture: ComponentFixture<ListItemTitleComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
