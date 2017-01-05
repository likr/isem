/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {Router} from '@angular/router'
import {RouteChangerService} from './route-changer.service'

class MockRouter {}

describe('RouteChangerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RouteChangerService,
        {provide: Router, useClass: MockRouter},
      ]
    })
  })

  it('should ...', inject([RouteChangerService], (service: RouteChangerService) => {
    expect(service).toBeTruthy()
  }))
})
