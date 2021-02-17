import { TestBed } from '@angular/core/testing';

import { TempDocService } from './temp-doc.service';

describe('TempDocService', () => {
  let service: TempDocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempDocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
