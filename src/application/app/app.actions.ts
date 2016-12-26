import {Injectable} from '@angular/core'
import {Actions, Action} from 'walts'

import {ViewName} from './app.routing'
import {AppState} from './app.state'
import {ModalDialogActions} from '../modal-dialog'
import {ProjectsActions} from '../project/projects.actions'

@Injectable()
export class AppActions extends Actions<AppState> {

  constructor(private modalDialog: ModalDialogActions,
              private projects: ProjectsActions) {
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
