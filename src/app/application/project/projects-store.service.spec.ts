/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {ProjectsStoreService} from './projects-store.service'

describe('ProjectsStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectsStoreService]
    })
  })

  it('should ...', inject([ProjectsStoreService], (service: ProjectsStoreService) => {
    expect(service).toBeTruthy()
  }))
})
