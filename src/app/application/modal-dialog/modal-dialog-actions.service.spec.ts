/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing'
import {ModalDialogActionsService} from './modal-dialog-actions.service'

describe('ModalDialogActionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalDialogActionsService]
    })
  })

  it('should ...', inject([ModalDialogActionsService], (service: ModalDialogActionsService) => {
    expect(service).toBeTruthy()
  }))
})
