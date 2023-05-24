import { TestBed } from '@angular/core/testing';

import { AnexoDataService } from './anexo-data.service';

describe('AnexoDataService', () => {
  let service: AnexoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnexoDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
