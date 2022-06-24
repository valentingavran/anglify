import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextAreaComponent } from './text-area.component';
import { AnglifyCommonModule } from '../common/anglify-common.module';
import { InputModule } from '../input/input.module';

describe('TextAreaComponent', () => {
  let component: TextAreaComponent;
  let fixture: ComponentFixture<TextAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextAreaComponent],
      imports: [InputModule, AnglifyCommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
