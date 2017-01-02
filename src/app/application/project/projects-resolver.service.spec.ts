/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {ProjectsResolverService} from './projects-resolver.service'

describe('ProjectsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectsResolverService]
    })
  })

  it('should ...', inject([ProjectsResolverService], (service: ProjectsResolverService) => {
    expect(service).toBeTruthy()
  }))
})
