/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModelServiceService } from './model-service.service';

describe('ModelServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModelServiceService]
    });
  });

  it('should ...', inject([ModelServiceService], (service: ModelServiceService) => {
    expect(service).toBeTruthy();
  }));
});
