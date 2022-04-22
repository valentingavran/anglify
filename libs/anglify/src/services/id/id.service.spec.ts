import { TestBed } from '@angular/core/testing';
import { AnglifyIdService } from './id.service';

describe('AnglifyIdService', () => {
  let service: AnglifyIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnglifyIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
