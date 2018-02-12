import { TestBed, inject } from '@angular/core/testing';

import { SymptomsService } from './symptoms.service';

describe('SymptomsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SymptomsService]
    });
  });

  it('should be created', inject([SymptomsService], (service: SymptomsService) => {
    expect(service).toBeTruthy();
  }));
});
