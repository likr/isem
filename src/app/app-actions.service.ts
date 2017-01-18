import {Injectable} from '@angular/core'
import {Actions, Action} from 'walts'

import {ViewName} from './app-routing'
import {AppState} from './app-state'
import {ModalDialogActionsService} from './application/modal-dialog/modal-dialog-actions.service'
import {ProjectsActionsService} from './application/project/projects-actions.service'

@Injectable()
export class AppActionsService extends Actions<AppState> {

  constructor(private modalDialog: ModalDialogActionsService,
              private projects: ProjectsActionsService) {
    super()
  }

  setCurrentView(name: ViewName): Action<AppState>[] {
    return this.combine([
      (st) => {
        return {
          currentView: name
        } as AppState
      },
      (() => {
        if (name === 'dashboard') {
          return this.projects.clearStoredData()
        }
        return (st: AppState) => st
      })(),
      this.modalDialog.close()
    ])
  }

}
