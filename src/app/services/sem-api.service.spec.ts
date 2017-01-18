/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {Http} from '@angular/http'
import {SemApiService} from './sem-api.service'

class MockHttp {}

describe('SemApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SemApiService,
        {provide: Http, useClass: MockHttp},
      ]
    })
  })

  it('should ...', inject([SemApiService], (service: SemApiService) => {
    expect(service).toBeTruthy()
  }))
})
