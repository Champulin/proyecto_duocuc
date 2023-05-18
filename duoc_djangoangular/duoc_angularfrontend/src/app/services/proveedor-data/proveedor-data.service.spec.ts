import { TestBed } from '@angular/core/testing';

import { ProveedorDataService } from './proveedor-data.service';

describe('ProveedorDataService', () => {
  let service: ProveedorDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProveedorDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
