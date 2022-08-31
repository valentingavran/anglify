import { TestBed } from '@angular/core/testing';

import { TableOfContentsService } from './table-of-contents.service';

describe('TableOfContentsService', () => {
  let service: TableOfContentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableOfContentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
