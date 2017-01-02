/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {ProjectsRepositoryService} from './projects-repository.service'

describe('ProjectsRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectsRepositoryService]
    })
  })

  it('should ...', inject([ProjectsRepositoryService], (service: ProjectsRepositoryService) => {
    expect(service).toBeTruthy()
  }))
})
