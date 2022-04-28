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

  it('should increase id every time', () => {
    expect(service.generate()).toMatch(/anglify_0\d*/);
    expect(service.generate()).toMatch(/anglify_1\d*/);
    expect(service.generate()).toMatch(/anglify_2\d*/);
    expect(service.generate()).toMatch(/anglify_3\d*/);
  });
  it('multiple service should work together', () => {
    const service2 = TestBed.inject(AnglifyIdService);
    expect(service.generate()).toMatch(/anglify_4\d*/);
    expect(service.generate()).toMatch(/anglify_5\d*/);
    expect(service.generate()).toMatch(/anglify_6\d*/);
    expect(service2.generate()).toMatch(/anglify_7\d*/);
  });
});
