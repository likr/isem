import {Injectable} from '@angular/core'
import {Actions, Action} from 'walts'

import {AppState} from '../app/app.state'
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
        },
        targetObservedVariableId: v.id
      } as AppState
    }
  }

  openLatentVariableDetail(v: LatentVariableVM): Action<AppState> {
    return (st) => {
      return {
        modalDialog: {
          type: 'latentVariableDetail',
          isVisible: true
        },
        targetLatentVariableId: v.id
      } as AppState
    }
  }
  openCreateRegression(): Action<AppState> {
    return (st) => {
      return {
        modalDialog: {
          type: 'createRegression',
          isVisible: true
        }
      } as AppState
    }
  }

  openCreateLatentVariableRelation(): Action<AppState> {
    return (st) => {
      return {
        modalDialog: {
          type: 'createLatentVariableRelation',
          isVisible: true
        }
      } as AppState
    }
  }

  openCreateCovariance(): Action<AppState> {
    return (st) => {
      return {
        modalDialog: {
          type: 'createCovariance',
          isVisible: true
        }
      } as AppState
    }
  }

  openCreateIntercept(): Action<AppState> {
    return (st) => {
      return {
        modalDialog: {
          type: 'createIntercept',
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
