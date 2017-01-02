/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {ProjectVmFactoryService} from './project-vm-factory.service'

describe('ProjectVmFactoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectVmFactoryService]
    })
  })

  it('should ...', inject([ProjectVmFactoryService], (service: ProjectVmFactoryService) => {
    expect(service).toBeTruthy()
  }))
})
