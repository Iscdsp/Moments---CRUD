import { TestBed } from '@angular/core/testing';

import { MomentService } from './moments.service';

describe('MomentsService', () => {
  let service: MomentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MomentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
