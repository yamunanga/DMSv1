import { TestBed } from '@angular/core/testing';

import { ManageDocMainService } from './manage-doc-main.service';

describe('ManageDocMainService', () => {
  let service: ManageDocMainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageDocMainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
