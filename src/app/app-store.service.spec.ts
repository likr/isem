/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {AppStoreService} from './app-store.service'
import {AppDispatcherService} from './app-dispatcher.service'
import {ProjectsRepositoryService} from './application/project/projects-repository.service'
import {CsvToJsonAdapterService} from './services/csv-to-json-adapter.service'

class MockProjectsRepositoryService {}
class MockCsvToJsonAdapterService {}

describe('AppStoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppStoreService,
        AppDispatcherService,
        {provide: ProjectsRepositoryService, useClass: MockProjectsRepositoryService},
        {provide: CsvToJsonAdapterService, useClass: MockCsvToJsonAdapterService},
      ]
    })
  })

  it('should ...', inject([AppStoreService], (service: AppStoreService) => {
    expect(service).toBeTruthy()
  }))
})
