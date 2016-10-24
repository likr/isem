import {Injectable} from '@angular/core'
import {Actions, Action} from 'walts'

import {AppState} from '../app/app.store'
import {ObservedVariableVM, LatentVariableVM} from '../variable'

@Injectable()
export class ModalDialogActions extends Actions<AppState> {

  openLoadFile(): Action<AppState> {
    return (st) => {
      return {
        modalDialog: {
          type: 'loadFile',
          isVisible: true
        }
      } as AppState
    }
  }

  openObservedVariableDetail(v: ObservedVariableVM): Action<AppState> {
    return (st) => {
      return {
        modalDialog: {
          type: 'observedVariableDetail',
          isVisible: true
        }
      } as AppState
    }
  }

  openLatentVariableDetail(v: LatentVariableVM): Action<AppState> {
    return (st) => {
      return {
        modalDialog: {
          type: 'latentVariableDetail',
          isVisible: true
        }
      } as AppState
    }
  }

  close(): Action<AppState> {
    return (st) => {
      return {
        modalDialog: {
          type: null,
          isVisible: false
        }
      } as AppState
    }
  }

}
