/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {ProjectsActionsService} from './projects-actions.service'
import {RouteChangerService} from '../../services/route-changer.service'
import {WindowRefService} from '../../services/window-ref.service'

class MockRouteChangerService {}

describe('ProjectsActionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProjectsActionsService,
        {provide: RouteChangerService, useClass: MockRouteChangerService},
        WindowRefService,
      ]
    })
  })

  it('should ...', inject([ProjectsActionsService], (service: ProjectsActionsService) => {
    expect(service).toBeTruthy()
  }))
})
