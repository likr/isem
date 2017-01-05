/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {DatabaseAdapterService} from './database-adapter.service'
import {LovefieldProviderService} from './lovefield-provider.service'

describe('DatabaseAdapterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DatabaseAdapterService,
        LovefieldProviderService,
      ]
    })
  })

  it('should ...', inject([DatabaseAdapterService], (service: DatabaseAdapterService) => {
    expect(service).toBeTruthy()
  }))
})
