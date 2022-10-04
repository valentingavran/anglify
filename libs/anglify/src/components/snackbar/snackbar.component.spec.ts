import type { ApplicationRef, ComponentFactoryResolver } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { Overlay } from '../../services/overlay.service';
import { SnackbarComponent } from './snackbar.component';
import { SNACKBAR_CONTEXT } from './snackbar.service';

describe('SnackbarComponent', () => {
  let component: SnackbarComponent;
  let fixture: ComponentFixture<SnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: SNACKBAR_CONTEXT,
          useValue: {
            overlayRef: new Overlay({} as ApplicationRef, {} as ComponentFactoryResolver),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
