import { TestBed } from '@angular/core/testing';

import { Rest1 } from './rest1';

describe('Rest1', () => {
  let service: Rest1;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Rest1);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
