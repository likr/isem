/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {Router} from '@angular/router'

import {AppActionsService} from './app-actions.service'
import {ModalDialogActionsService} from './application/modal-dialog/modal-dialog-actions.service'
import {ProjectsActionsService} from './application/project/projects-actions.service'
import {RouteChangerService} from './services/route-changer.service'
import {WindowRefService} from './services/window-ref.service'

class MockRouter {}

describe('AppActionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppActionsService,
        ModalDialogActionsService,
        ProjectsActionsService,
        RouteChangerService,
        WindowRefService,
        {provide: Router, useClass: MockRouter}
      ]
    })
  })

  it('should ...', inject([AppActionsService], (service: AppActionsService) => {
    expect(service).toBeTruthy()
  }))
})
