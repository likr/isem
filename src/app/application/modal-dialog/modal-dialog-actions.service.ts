import {Injectable} from '@angular/core'
import {Actions, Action} from 'walts'

import {AppState} from '../../app-state'
import {ObservedVariableVm} from '../variable/observed-variable-vm'
import {LatentVariableVm} from '../variable/latent-variable-vm'

@Injectable()
export class ModalDialogActionsService extends Actions<AppState> {

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

  openObservedVariableDetail(v: ObservedVariableVm): Action<AppState> {
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

  openLatentVariableDetail(v: LatentVariableVm): Action<AppState> {
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
