import { TestBed } from '@angular/core/testing';

import { OnlineBackupService } from './online-backup.service';

describe('OnlineBackupService', () => {
  let service: OnlineBackupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnlineBackupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
