/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {AppDispatcherService} from './app-dispatcher.service'

describe('AppDispatcherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppDispatcherService]
    })
  })

  it('should ...', inject([AppDispatcherService], (service: AppDispatcherService) => {
    expect(service).toBeTruthy()
  }))
})
