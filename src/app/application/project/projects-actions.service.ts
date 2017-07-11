import {Injectable} from '@angular/core'
import {Actions, Action} from 'walts'

import {AppState} from '../../app-state'
import {RouteChangerService} from '../../services/route-changer.service'
import {WindowRefService} from '../../services/window-ref.service'
import {ProjectVm} from './project-vm'
import {ObservedVariableVm} from '../variable/observed-variable-vm'
import {LatentVariableVm} from '../variable/latent-variable-vm'

const confirmRemove = (_window: Window): boolean => {
  return _window.confirm('Are you sure?')
}

@Injectable()
export class ProjectsActionsService extends Actions<AppState> {

  private window: Window

  constructor(private routeChanger: RouteChangerService,
              windowRef: WindowRefService) {
    super()
    this.window = windowRef.nativeWindow
  }

  createNewProject(projectName: string, modelCsv: string): Action<AppState> {
    return (st) => {
      return this.delayed((apply) => {
        st.projects.create(projectName, modelCsv).then(() => {
          apply((_st) => _st)
        })
      })
    }
  }

  showDetail(project: ProjectVm): Action<AppState> {
    return (st) => {
      this.routeChanger.toDetail(project.uuid)
      return st
    }
  }

  initDetail(uuid: string): Action<AppState> {
    return (st) => {
      st.projects.emitQuerySingle(uuid)
      return {
        currentId: uuid
      } as AppState
    }
  }

  deleteProject(project: ProjectVm): Action<AppState> {
    return (st) => {
      if (!confirmRemove(this.window)) {
        return st
      }
      return this.delayed((apply) => {
        st.projects.delete(project.uuid).then(() => {
          apply((_st) => _st)
        })
      }) as any
    }
  }

  addLatentVariable(): Action<AppState> {
    return (st) => {
      st.projects.addLatentVariable(st.currentId)
      return st
    }
  }

  removeLatentVariable(variable: LatentVariableVm): Action<AppState> {
    return (st) => {
      if (!confirmRemove(this.window)) {
        return st
      }
      st.projects.removeLatentVariable(st.currentId, variable.id)
      return st
    }
  }

  changeLatentVariableKey(variable: LatentVariableVm, newKey: string): Action<AppState> {
    return (st) => {
      st.projects.changeLatentVariableKey(st.currentId, variable.id, newKey)
      return st
    }
  }

  addCovariance(variable1Id: string, variable2Id: string): Action<AppState> {
    return (st) => {
      return this.delayed((apply) => {
        st.projects.addCovariance(
          st.currentId,
          variable1Id,
          variable2Id
        ).then(() => {
          apply(this.calcSem())
        })
      })
    }
  }

  addIntercept(variableId: string, value: number): Action<AppState> {
    return (st) => {
      return this.delayed((apply) => {
        st.projects.addIntercept(
          st.currentId,
          variableId,
          value
        ).then(() => {
          apply(this.calcSem())
        })
      })
    }
  }

  addLatentVariableRelation(latentVariableId: string, observedVariableIds: string[]): Action<AppState> {
    return (st) => {
      return this.delayed((apply) => {
        st.projects.addLatentVariableRelation(
          st.currentId,
          latentVariableId,
          observedVariableIds
        ).then(() => {
          apply(this.calcSem())
        })
      })
    }
  }

  addRegression(dependentVariableId: string, variableIds: string[]): Action<AppState> {
    return (st) => {
      return this.delayed((apply) => {
        st.projects.addRegression(
          st.currentId,
          dependentVariableId,
          variableIds
        ).then(() => {
          apply(this.calcSem())
        })
      })
    }
  }

  removeRegression(id: string): Action<AppState> {
    return (st) => {
      if (!confirmRemove(this.window)) {
        return st
      }
      return this.delayed((apply) => {
        st.projects.removeRegression(st.currentId, id).then(() => {
          apply(this.calcSem())
        })
      }) as any
    }
  }

  removeLatentVariableRelation(id: string): Action<AppState> {
    return (st) => {
      if (!confirmRemove(this.window)) {
        return st
      }
      return this.delayed((apply) => {
        st.projects.removeLatentVariableRelation(st.currentId, id).then(() => {
          apply(this.calcSem())
        })
      }) as any
    }
  }

  removeCovariance(id: string): Action<AppState> {
    return (st) => {
      if (!confirmRemove(this.window)) {
        return st
      }
      return this.delayed((apply) => {
        st.projects.removeCovariance(st.currentId, id).then(() => {
          apply(this.calcSem())
        })
      }) as any
    }
  }

  removeIntercept(id: string): Action<AppState> {
    return (st) => {
      if (!confirmRemove(this.window)) {
        return st
      }
      return this.delayed((apply) => {
        st.projects.removeIntercept(st.currentId, id).then(() => {
          apply(this.calcSem())
        })
      }) as any
    }
  }

  calcSem(): Action<AppState> {
    return (st) => {
      return this.delayed((apply) => {
        st.projects.calcSem(st.currentId).then((data) => {
          apply((_) => ({data} as AppState))
        })
      })
    }
  }

  clearStoredData(): Action<AppState> {
    return (st) => {
      st.currentId = null
      st.data = null
      return st
    }
  }

  setCurrentObservedVariable(v: ObservedVariableVm): Action<AppState> {
    return (st) => {
      st.targetObservedVariableId = v.id
      return st
    }
  }

}
