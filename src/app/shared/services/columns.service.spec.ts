import { TestBed } from '@angular/core/testing';

import { ColumnsService } from './columns.service';

describe('ColumnsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ColumnsService = TestBed.get(ColumnsService);
    expect(service).toBeTruthy();
  });
});
