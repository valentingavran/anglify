import { ComponentFixture, TestBed } from '@angular/core/testing';
import { POSITION_SETTINGS } from 'libs/anglify/src/composables/position/position.token';
import { TooltipComponent } from './tooltip.component';

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TooltipComponent],
      providers: [
        {
          provide: POSITION_SETTINGS,
          useValue: {
            host: document.createElement('div'),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
