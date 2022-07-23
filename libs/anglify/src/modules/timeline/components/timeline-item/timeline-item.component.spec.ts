import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimelineItemComponent } from './timeline-item.component';
import { AnglifyCommonModule } from '../../../common/anglify-common.module';

describe('TimelineItemComponent', () => {
  let component: TimelineItemComponent;
  let fixture: ComponentFixture<TimelineItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimelineItemComponent],
      imports: [AnglifyCommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
