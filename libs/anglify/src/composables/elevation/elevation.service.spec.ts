import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MockElementRef } from '../../mocks/element-ref.mock';
import { ElevationService } from './elevation.service';

describe('ElevationService', () => {
  let service: ElevationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ElevationService,
        {
          provide: ElementRef,
          useClass: MockElementRef,
        },
      ],
    });
    service = TestBed.inject(ElevationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add and remove elevation classes from native element', () => {
    const elementRef = TestBed.inject(ElementRef);
    const nativeElement = elementRef.nativeElement as HTMLDivElement;
    expect(nativeElement.classList.value).toBe('');
    service.elevation = 10;
    expect(nativeElement.classList.value).toBe('anglify-elevation-10');
    service.elevation = 13;
    expect(nativeElement.classList.value).toBe('anglify-elevation-13');
  });
});
