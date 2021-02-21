import { TestBed } from '@angular/core/testing';

import { ManageApprovementServiceService } from './manage-approvement-service.service';

describe('ManageApprovementServiceService', () => {
  let service: ManageApprovementServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageApprovementServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
