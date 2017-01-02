/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {SemApiService} from './sem-api.service'

describe('SemApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SemApiService]
    })
  })

  it('should ...', inject([SemApiService], (service: SemApiService) => {
    expect(service).toBeTruthy()
  }))
})
