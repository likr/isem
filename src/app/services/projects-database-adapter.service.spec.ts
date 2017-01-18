/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {ProjectsDatabaseAdapterService} from './projects-database-adapter.service'
import {DatabaseAdapterService} from './database-adapter.service'
import {LovefieldProviderService} from './lovefield-provider.service'

describe('ProjectsDatabaseAdapterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectsDatabaseAdapterService,
        DatabaseAdapterService,
        LovefieldProviderService,
      ]
    })
  })

  it('should ...', inject([ProjectsDatabaseAdapterService], (service: ProjectsDatabaseAdapterService) => {
    expect(service).toBeTruthy()
  }))
})
