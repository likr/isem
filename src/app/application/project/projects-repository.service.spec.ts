/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {ProjectsRepositoryService} from './projects-repository.service'
import {CsvToJsonAdapterService} from '../../services/csv-to-json-adapter.service'
import {ProjectsDatabaseAdapterService} from '../../services/projects-database-adapter.service'
import {SemApiService} from '../../services/sem-api.service'
import {MockProjectsDatabaseAdapterService} from '../../mocks/services/mock-projects-database-adapter.service'

class MockCsvToJsonAdapterService {}
class MockSemApiService {}

describe('ProjectsRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectsRepositoryService,
        {provide: CsvToJsonAdapterService, useClass: MockCsvToJsonAdapterService},
        {provide: ProjectsDatabaseAdapterService, useClass: MockProjectsDatabaseAdapterService},
        {provide: SemApiService, useClass: MockSemApiService},
      ]
    })
  })

  it('should ...', inject([ProjectsRepositoryService], (service: ProjectsRepositoryService) => {
    expect(service).toBeTruthy()
  }))
})
