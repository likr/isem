/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {RouteChangerService} from './route-changer.service'

describe('RouteChangerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RouteChangerService]
    })
  })

  it('should ...', inject([RouteChangerService], (service: RouteChangerService) => {
    expect(service).toBeTruthy()
  }))
})
