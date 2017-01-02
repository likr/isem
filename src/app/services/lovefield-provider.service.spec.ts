/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {LovefieldProviderService} from './lovefield-provider.service'

describe('LovefieldProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LovefieldProviderService]
    })
  })

  it('should ...', inject([LovefieldProviderService], (service: LovefieldProviderService) => {
    expect(service).toBeTruthy()
  }))
})
