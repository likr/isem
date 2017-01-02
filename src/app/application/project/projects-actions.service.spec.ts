/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {ProjectsActionsService} from './projects-actions.service'

describe('ProjectsActionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectsActionsService]
    })
  })

  it('should ...', inject([ProjectsActionsService], (service: ProjectsActionsService) => {
    expect(service).toBeTruthy()
  }))
})
