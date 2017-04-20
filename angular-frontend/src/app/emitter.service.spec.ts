/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EmitterService } from './emitter.service';

describe('EmitterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmitterService]
    });
  });

  it('should ...', inject([EmitterService], (service: EmitterService) => {
    expect(service).toBeTruthy();
  }));
});
