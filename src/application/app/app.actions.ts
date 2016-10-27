import {Injectable} from '@angular/core'
import {Actions, Action} from 'walts'

import {ViewName} from './app.routing'
import {AppState} from './app.state'
import {ModalDialogActions} from '../modal-dialog'

@Injectable()
export class AppActions extends Actions<AppState> {

  constructor(private modalDialog: ModalDialogActions) {
    super()
  }

  setCurrentView(name: ViewName): Action<AppState>[] {
    return this.combine([
      (st) => {
        return {
          currentView: name
        } as AppState
      },
      this.modalDialog.close()
    ])
  }

}
