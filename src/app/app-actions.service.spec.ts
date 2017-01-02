/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {AppActionsService} from './app-actions.service'

describe('AppActionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppActionsService]
    })
  })

  it('should ...', inject([AppActionsService], (service: AppActionsService) => {
    expect(service).toBeTruthy()
  }))
})
