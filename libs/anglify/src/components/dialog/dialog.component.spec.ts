import type { ApplicationRef, ComponentFactoryResolver } from '@angular/core';
import { TestBed, type ComponentFixture } from '@angular/core/testing';
import { Overlay } from '../../services/overlay.service';
import { DialogComponent } from './dialog.component';
import { DIALOG_CONTEXT, DIALOG_NODES } from './dialog.service';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {
          provide: DIALOG_CONTEXT,
          useValue: {
            overlayRef: new Overlay({} as ApplicationRef, {} as ComponentFactoryResolver),
          },
        },
        { provide: DIALOG_NODES, useValue: [] },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
