import { TestBed } from '@angular/core/testing';

import { ContentproxyService } from './contentproxy.service';

describe('ContentproxyService', () => {
  let service: ContentproxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContentproxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
