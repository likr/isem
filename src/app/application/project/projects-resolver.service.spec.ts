/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'

import {ProjectsResolverService} from './projects-resolver.service'
import {ProjectsStoreService} from './projects-store.service'
import {MockProjectsStoreService} from '../../mocks/application/project/mock-projects-store.service'

describe('ProjectsResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectsResolverService,
        {provide: ProjectsStoreService, useClass: MockProjectsStoreService}
      ]
    })
  })

  it('should ...', inject([ProjectsResolverService], (service: ProjectsResolverService) => {
    expect(service).toBeTruthy()
  }))
})
