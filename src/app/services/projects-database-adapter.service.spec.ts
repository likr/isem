/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {ProjectsDatabaseAdapterService} from './projects-database-adapter.service'

describe('ProjectsDatabaseAdapterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectsDatabaseAdapterService]
    })
  })

  it('should ...', inject([ProjectsDatabaseAdapterService], (service: ProjectsDatabaseAdapterService) => {
    expect(service).toBeTruthy()
  }))
})
