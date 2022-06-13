import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PositionService } from './position.service';
import { POSITION_SETTINGS } from './position.token';
import { MockElementRef } from '../../mocks/element-ref.mock';

describe('PositionService', () => {
  let service: PositionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PositionService,
        {
          provide: ElementRef,
          useClass: MockElementRef,
        },
        {
          provide: POSITION_SETTINGS,
          useValue: {
            host: document.createElement('div'),
          },
        },
      ],
    });
    service = TestBed.inject(PositionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
