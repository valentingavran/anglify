import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomNavigationComponent } from './bottom-navigation.component';
import { AnglifyCommonModule } from '../common/anglify-common.module';

describe('BottomNavigationComponent', () => {
  let component: BottomNavigationComponent;
  let fixture: ComponentFixture<BottomNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BottomNavigationComponent],
      imports: [AnglifyCommonModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
