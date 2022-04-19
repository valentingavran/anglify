import { TestBed } from '@angular/core/testing';
import { AnglifyDestroyService } from './destroy.service';

describe('AnglifyDestroyService', () => {
  let service: AnglifyDestroyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnglifyDestroyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
