import { TestBed } from '@angular/core/testing';

import { AdminGate } from './admin-gate.guard';

describe('AdminGate', () => {
  let guard: AdminGate;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AdminGate);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
