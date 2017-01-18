/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {ProjectsStoreService} from './projects-store.service'

import {AppStoreService} from '../../app-store.service'
import {MockAppStoreService} from '../../mocks/mock-app-store.service'
import {ProjectsRepositoryService} from './projects-repository.service'
import {ProjectVmFactoryService} from './project-vm-factory.service'

class MockProjectsRepositoryService {}
class MockProjectVmFactoryService {}

describe('ProjectsStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectsStoreService,
        {provide: AppStoreService, useClass: MockAppStoreService},
        {provide: ProjectsRepositoryService, useClass: MockProjectsRepositoryService},
        {provide: ProjectVmFactoryService, useClass: MockProjectVmFactoryService},
      ]
    })
  })

  it('should ...', inject([ProjectsStoreService], (service: ProjectsStoreService) => {
    expect(service).toBeTruthy()
  }))
})
