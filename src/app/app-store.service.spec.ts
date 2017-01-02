/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {AppStoreService} from './app-store.service'

describe('AppStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppStoreService]
    })
  })

  it('should ...', inject([AppStoreService], (service: AppStoreService) => {
    expect(service).toBeTruthy()
  }))
})
