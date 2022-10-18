import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { POSITION_SETTINGS } from '../../../../composables/position/position.token';
import { LegacyMenuComponent } from './legacy-menu.component';

describe('LegacyMenuComponent', () => {
  let component: LegacyMenuComponent;
  let fixture: ComponentFixture<LegacyMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
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
    fixture = TestBed.createComponent(LegacyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
