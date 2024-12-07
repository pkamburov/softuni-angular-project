import { TestBed } from '@angular/core/testing';

import { ErrorMsgService } from './error-msg.service';

describe('ErrorMsgService', () => {
  let service: ErrorMsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorMsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
