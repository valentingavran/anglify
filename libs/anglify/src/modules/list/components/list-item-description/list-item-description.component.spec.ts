import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListItemDescriptionComponent } from './list-item-description.component';

describe('ListItemDescriptionComponent', () => {
  let component: ListItemDescriptionComponent;
  let fixture: ComponentFixture<ListItemDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListItemDescriptionComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
