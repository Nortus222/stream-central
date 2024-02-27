import { TestBed } from '@angular/core/testing';

import { MovieproxyService } from './movieproxy.service';

describe('MovieproxyService', () => {
  let service: MovieproxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieproxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
